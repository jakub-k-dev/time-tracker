type Props = {
  title: string;
};

export default function PageTitle({ title }: Props) {
  return <h1 className="text-3xl font-bold text-secondary-text">{title}</h1>;
}
