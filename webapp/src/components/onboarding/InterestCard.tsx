export type InterestCardProps = {
  movieData: unknown;
};

export default function InterestCard({ movieData }: InterestCardProps) {
  return <>{JSON.stringify(movieData)}</>;
}
