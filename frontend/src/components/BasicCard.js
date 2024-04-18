import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';

const BasicCard = ({ title, content, actionLink, linkedInLink, imageUrl }) => {
  return (
    <Card sx={{ minWidth: 275, backgroundColor: '#F1F1F1' }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {title}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {imageUrl && <img src={imageUrl} alt={title} style={{ width: 50, marginRight: 10 }} />}
          <Typography variant="h5" component="div">
            {content}
          </Typography>
        </Box>
      </CardContent>
      {actionLink && (
        <CardActions>
          <a href={actionLink} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
            <Button size="small" startIcon={<GitHubIcon />}>GitHub</Button>
          </a>
          {linkedInLink && (
            <a href={linkedInLink} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
              <Button size="small" startIcon={<LinkedInIcon />}>LinkedIn</Button>
            </a>
          )}
        </CardActions>
      )}
    </Card>
  );
};

export default BasicCard;