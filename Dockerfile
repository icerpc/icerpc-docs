FROM node:lts-alpine as base

FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json*  ./

# See https://nextjs.org/docs/messages/sharp-missing-in-production
RUN npm i sharp
RUN npm ci

FROM base as builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

ARG GA_MEASUREMENT_ID
ENV NEXT_PUBLIC_GA_MEASUREMENT_ID $GA_MEASUREMENT_ID

RUN npm run build

FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

RUN chown -R nextjs:nodejs ./

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME 0.0.0.0

CMD ["node", "server.js"]
