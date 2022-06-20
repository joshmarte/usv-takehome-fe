// DEPENDENCIES
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import logo from "../../Assets/logo.png";

export default function Restaurant({ data }) {
    return (
        <div className="restaurant" style={{display:"flex"}}>
            <Card.Img variant="left" src={logo} style={{maxWidth:"200px", height:"auto", border:"1px dashed orange"}} />
            <Card style={{ width: '40rem' }}>
                <Card.Body>
                <Card.Title>{`${data.name} | ${data.cuisine}`}</Card.Title>
                <Card.Subtitle style={{display:"flex"}}>
                <i class="fa-solid fa-location-dot"></i>
                {`${data.location} | ${data.openingTime.toLocaleString('en-US')} - ${data.closingTime}`}
                </Card.Subtitle>
                <Card.Text>
                {data.description.length > 300 ? data.description.split(" ").filter((item,index)=>{
                    return index < 50
                }).join(" ")+"...": data.description}
                </Card.Text>
                <Button variant="primary">View Reservations</Button>
                </Card.Body>
            </Card>
        </div>
    );
}
{/* <img
src="http://cdn.onlinewebfonts.com/svg/img_224457.png"
alt="generic restaurant icon"
height="100px"
width="100px"
/>
<h3>{data.name}</h3>
<h1>{data.location}</h1>
<h1>{data.cuisine}</h1>
<h1>{data.price}</h1> */}