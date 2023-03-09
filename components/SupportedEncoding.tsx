import clsx from 'clsx';
import { useVersionContext } from 'context/state';
import { SliceVersion } from 'types';

interface Props {
  supported: SliceVersion[];
}

export const SupportedEncodings = ({ supported }: Props) => {
  const { version, setVersion } = useVersionContext();
  return (
    <div className="mt-2 mb-4 flex flex-row items-center justify-start pb-8">
      <h3 className="my-0 mr-2 text-sm font-semibold">Supports:</h3>
      <div className="flex flex-row items-center justify-start gap-2">
        {supported &&
          supported.map((encoding) => (
            <button
              key={encoding}
              onClick={() => setVersion(encoding)}
              className={clsx(
                'flex flex-row items-center justify-center rounded-full border px-3 py-1 text-sm font-medium leading-5',
                'border-lightBorder dark:border-darkBorder',
                encoding == version ? 'border-primary text-primary' : ''
              )}
            >
              {encoding}
            </button>
          ))}
      </div>
    </div>
  );
};
