import Link from "@mui/material/Link";
import Avatar from "@mui/material/Avatar";

const About = ({ fullName, profileUrl, location, twitterUrl }) => {
  return (
    <div
      style={{
        border: "2px solid black",
        padding: "8px 18px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        alignItems: "start",
        minWidth: "25%",
        boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
        borderRadius: "6px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          alignItems: "center",
        }}
      >
        <h2>{fullName}</h2>
        <Avatar sx={{ width: 56, height: 56 }}>{fullName[0]}</Avatar>
      </div>

      {profileUrl.length > 0 && (
        <Link href={profileUrl} target="_blank">
          Visit Github
        </Link>
      )}
      <p>{location}</p>
      <p>{twitterUrl}</p>
    </div>
  );
};

export default About;
