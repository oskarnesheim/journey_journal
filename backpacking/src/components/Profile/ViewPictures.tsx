type ViewPicturesProps = {
  imgURLs: string[];
};

export function ViewPictures({ imgURLs }: ViewPicturesProps) {
  return (
    <div className="view-pictures">
      {imgURLs.map((imgURL) => (
        <img className="h-52 p-2" src={imgURL} />
      ))}
    </div>
  );
}
