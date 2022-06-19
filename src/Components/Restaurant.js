export default function Restaurant({ data }) {
    return (
        <div className="restaurant">
            <img
                src="http://cdn.onlinewebfonts.com/svg/img_224457.png"
                alt="generic restaurant icon"
                height="100px"
                width="100px"
            />
            <h3>{data.name}</h3>
            <h1>{data.location}</h1>
            <h1>{data.cuisine}</h1>
            <h1>{data.price}</h1>
        </div>
    );
}
