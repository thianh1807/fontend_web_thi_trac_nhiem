import Icon from "./Icon";

export default function Loading() {
  return (
    <div className="absolute inset-0 w-full h-full flex justify-center items-center bg-white">
      <Icon icon="Loader2" className="w-8 h-8 animate-spin" />
    </div>
  );
}
