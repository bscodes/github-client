interface HorizontalLineSignature {
  index: number;
  arr: Array<any> | [];
}

const HorizontalLine = ({ index, arr }: HorizontalLineSignature) => {
  return (
    <>
      {index !== arr.length - 1 && (
        <hr className="w-full border-gray-400 dark:border-gray-800 opacity-10 dark:opacity-30" />
      )}
    </>
  );
};

export default HorizontalLine;
