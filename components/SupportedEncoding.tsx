import clsx from 'clsx';
import { useEncoding } from 'context/state';
import { Encoding } from 'types';

interface Props {
  supported: Encoding[];
}

export const SupportedEncodings = ({ supported }: Props) => {
  const { encoding: currentEncoding, setEncoding } = useEncoding();

  return (
    <div className="flex flex-row items-center justify-start pt-1 pb-4">
      <h3 className="my-0 mr-2 text-sm font-semibold">Supports:</h3>
      <div className="flex flex-row items-center justify-start gap-2">
        {supported &&
          supported.map((encoding) => (
            <button
              key={encoding}
              onClick={() => setEncoding(encoding)}
              className={clsx(
                'flex flex-row items-center justify-center rounded-full border px-3 py-1 text-sm font-medium leading-5',
                'border-lightBorder dark:border-darkBorder',
                encoding == currentEncoding ? 'border-primary text-primary' : ''
              )}
            >
              {encoding}
            </button>
          ))}
      </div>
    </div>
  );
};
