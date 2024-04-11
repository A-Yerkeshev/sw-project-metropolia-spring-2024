import { Box, Typography } from '@mui/material';
import * as React from "react";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";

const Footer: React.FC = () => {
  return (
    <Box sx={{ width: "auto", padding: "7%", backgroundColor: 'white', textAlign: 'center' }}>
      <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
        <Link color="inherit" href="/about-us">About Us</Link> {/* New Link */}
        <br /> {/* Adding line break */}
        Created by Metropolia students 💕
        {new Date().getFullYear()}
      </Typography>
      {/* Add any links or social media icons here */}
    </Box>
  );
};

export default Footer;

// export default function Footer() {
//   return (
//     <Box
//       sx={{
//         backgroundColor: (theme) =>
//           theme.palette.mode === "light"
//             ? theme.palette.grey[200]
//             : theme.palette.grey[800],
//         pt: 4,
//         textAlign: 'center'
//       }}
//       component="footer"
//     >
//       <Container maxWidth="sm">
//         <Typography variant="body2" color="text.secondary" align="center">
//         <Link color="inherit" href="/about-us">About Us</Link> {/* New Link */}
//           <br /> {/* Adding line break */}
//           {"Copyright © "}
//           {/* <Link color="inherit" href="https://your-website.com/"> */}
//           Created by Metropolia students 💕
//           {/* </Link>{" "} */}
//           {new Date().getFullYear()}
//           {"."}
//         </Typography>
//       </Container>
//     </Box>
//   );
// }
