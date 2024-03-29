type ViewPicturesProps = {
  imgURLs: string[];
};

export function ViewPictures({ imgURLs }: ViewPicturesProps) {
  if (!imgURLs) return <div></div>;
  return (
    <div className="flex flex-row overflow-x-auto">
      {imgURLs.map((imgURL) => (
        <img key={imgURL} className="h-80 p-2" src={imgURL} />
      ))}
    </div>
  );
}
