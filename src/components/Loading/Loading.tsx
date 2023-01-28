interface LoadingSignature {
  loading: boolean;
}

const Loading = ({ loading }: LoadingSignature) => {
  return <>{loading ? <h3 className="text-center">Loading...</h3> : null}</>;
};

export default Loading;
