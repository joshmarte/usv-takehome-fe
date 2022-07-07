// DEPENDENCIES
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Home() {
    //NAVIGATE
    let navigate = useNavigate();

    //HANDLE CLICK
    const handleClick = () => {
        navigate("./restaurants");
    };

    //
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="home-container">
            <Card className="bg-dark text-white">
                <Card.Img
                    src="https://www.willflyforfood.net/wp-content/uploads/2021/09/ethiopian-food-yetsom-beyaynetu.jpg"
                    alt="Ethopian Food"
                    style={{
                        filter: "brightness(40%)",
                        borderRadius: "0",
                        height: "100vh",
                    }}
                />
                <Card.ImgOverlay
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "flex-start",
                        gap: "50px",
                        marginTop: "90px",
                    }}
                >
                    <Card.Title as="h1" style={{ fontStyle: "italic" }}>
                        Reservations at the palm of your hand
                    </Card.Title>
                    <Card.Text>
                        <Button
                            style={{
                                backgroundColor: "orange",
                                border: "2px solid orange",
                            }}
                            onClick={handleClick}
                        >
                            View Restaurants
                        </Button>
                    </Card.Text>
                </Card.ImgOverlay>
            </Card>
        </div>
    );
}
