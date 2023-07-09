import imageOne from "./Picutre/blob 5.png";
import imageOne2 from "./Picutre/blobs.png";

const PicutreDisplayHtml = () => {
  return (
    <div>
      <div className="picture--one">
        <img src={imageOne} />
      </div>
      <div className="picture--two ">
        <img src={imageOne2} />
      </div>
    </div>
  );
};

export default PicutreDisplayHtml;
