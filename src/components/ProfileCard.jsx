import profile_img from "../assets/person.jpeg"
import arrow from "../assets/arrow.svg"
import { useNavigate } from "react-router-dom"

export default function ProfileCard({ name, expertise, company, id, type }) {

    const navigate = useNavigate()

    const styles = {
        profile_image: {
            height: "50px",
            borderRadius: "10px",
        },

        card: {
            margin: "2em 0",
            width: "75%",
            padding: "1em",
            borderRadius: "18px",
            background: "var(--main-bg-color)",
            boxShadow: "-11px -11px 22px 0px var(--light-shadow), 11px 11px 22px 0px var(--dark-shadow)",
        },

        name: {
            margin: "0",
            padding: "0 0.5em",
            color: "var(--text-color-dark)",
            fontFamily: "Poppins",
            fontSize: "var(--font-size-lg)",
            fontStyle: "normal",
            fontWeight: 400,
            lineHeight: "normal",
            letterSpacing: "-0.333px",
        },

        text: {
            margin: "0",
            padding: "0",
            color: "var(--text-color-light)",
            fontFamily: "Poppins",
            fontSize: "var(--font-size-sm)",
            fontStyle: "normal",
            fontWeight: 400,
            lineHeight: "normal",
            letterSpacing: "-0.333px",
        }
    }

    function handleClick() {
        navigate("/details", { state: { id: id, type: type } })
    }
    return (
        <div style={styles.card} onClick={handleClick}>
            <div style={{ display: "flex", alignItems: "flex-end" }}>
                <img style={styles.profile_image} src={profile_img} alt="" />
                <p style={styles.name}>{name}</p>
            </div>

            <div style={{ margin: "5px" }}>
                {
                    expertise
                        ? <p style={styles.text}>{expertise.join(" | ") + " Expert"}</p>
                        : <></>
                }

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <p style={styles.text}>{company}</p>
                    <div>
                        <img src={arrow} alt="" />
                        <img src={arrow} alt="" />
                    </div>
                </div>

            </div>

        </div>
    )
}