import React from "react";
import { Card, CardContent, Avatar, Typography, Box, IconButton } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmailIcon from "@mui/icons-material/Email";
import GitHubIcon from "@mui/icons-material/GitHub";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const MatchCard = ({ match }) => {
  const { user, mutualSkills, reverseMatch } = match;

  return (
    <Card
      sx={{
        width: 300,
        borderRadius: 4,
        overflow: "hidden",
        background: "#1e1e2f",
        color: "#fff",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
      }}
    >
      {/* Profile Picture Section */}
      <Box
        sx={{
          background: "#ff4d6d",
          padding: 2,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Avatar
          src={user.profilePic || "https://via.placeholder.com/100"} // Default image if none
          alt={user.username}
          sx={{
            width: 100,
            height: 100,
            border: "4px solid white",
          }}
        />
      </Box>

      {/* User Details */}
      <CardContent sx={{ textAlign: "center" }}>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          {user.username}
        </Typography>
        <Typography variant="body2" color="gray">
          Skill Exchanger
        </Typography>

        {/* Location */}
        {user.location && (
          <Box display="flex" alignItems="center" justifyContent="center" mt={1}>
            <LocationOnIcon sx={{ color: "#ff4d6d", fontSize: 18, mr: 0.5 }} />
            <Typography variant="body2">{user.location}</Typography>
          </Box>
        )}

        {/* Email */}
        {user.email && (
          <Box display="flex" alignItems="center" justifyContent="center" mt={1}>
            <EmailIcon sx={{ color: "#4dabf7", fontSize: 18, mr: 0.5 }} />
            <Typography variant="body2">{user.email}</Typography>
          </Box>
        )}

        {/* Mutual Skills */}
        {mutualSkills.length > 0 && (
          <>
            <Typography variant="subtitle2" mt={2} sx={{ fontWeight: "bold", color: "#ff4d6d" }}>
              Mutual Skills:
            </Typography>
            <Box display="flex" justifyContent="center" flexWrap="wrap" gap={1} mt={1}>
              {mutualSkills.map((skill, index) => (
                <Typography
                  key={index}
                  sx={{
                    background: "#4dabf7",
                    padding: "4px 8px",
                    borderRadius: "12px",
                    fontSize: "12px",
                  }}
                >
                  {skill}
                </Typography>
              ))}
            </Box>
          </>
        )}

        {/* Reverse Match Skills */}
        {reverseMatch.length > 0 && (
          <>
            <Typography variant="subtitle2" mt={2} sx={{ fontWeight: "bold", color: "#4dabf7" }}>
              They Need From You:
            </Typography>
            <Box display="flex" justifyContent="center" flexWrap="wrap" gap={1} mt={1}>
              {reverseMatch.map((skill, index) => (
                <Typography
                  key={index}
                  sx={{
                    background: "#ff4d6d",
                    padding: "4px 8px",
                    borderRadius: "12px",
                    fontSize: "12px",
                  }}
                >
                  {skill}
                </Typography>
              ))}
            </Box>
          </>
        )}

        {/* Social Links */}
        <Box display="flex" justifyContent="center" mt={2} gap={1}>
          {user.socialLinks?.linkedin && user.socialLinks.linkedin !== "" && (
            <IconButton href={user.socialLinks.linkedin} target="_blank" sx={{ color: "#0077b5" }}>
              <LinkedInIcon />
            </IconButton>
          )}
          {user.socialLinks?.twitter && user.socialLinks.twitter !== "" && (
            <IconButton href={user.socialLinks.twitter} target="_blank" sx={{ color: "#1da1f2" }}>
              <TwitterIcon />
            </IconButton>
          )}
          {user.socialLinks?.github && user.socialLinks.github !== "" && (
            <IconButton href={user.socialLinks.github} target="_blank" sx={{ color: "#fff" }}>
              <GitHubIcon />
            </IconButton>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default MatchCard;
