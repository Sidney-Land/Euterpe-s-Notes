import React, { CSSProperties } from 'react';

interface PostCardProps {}

const PostCard = (props: PostCardProps) => {
  //what does cssproperties do again?
  const cardStyle: CSSProperties = {
    //**style of the card**
    display: 'flex',
    //aligns the text to the top left of the screen
    alignItems: 'flex-start',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    background: '#292929',
    border: '2px solid #e2e8f0',
    //text color
    color: '#ffffff',

    //**layout of the card**
    padding: '16px',
    margin: '16px auto',
    width: '95%',
    maxWidth: '600px',
    //will adjust the height to fit the text within it
    height: 'auto',
    minHeight: '200px',
    //these lines force a long string of text without space characters to wrap around if the text
    //is too long to fit into the card, preventing it from going off the card
    overflowWrap: 'anywhere', // This is the magic line
    wordBreak: 'break-word'   // A backup for older browsers
    
    //adds a shadow effect to the card. first value is horizontal placement of the "light source",
    //second is vertical placement, third is blur radius that gives the shadow blurrier or sharper
    //edges, with lower values making it sharper, fourth is spread radius, which defines how
    //big the shadow shoudl be compared to the component it's attached to, last is color, with the
    //fourth value there being opacity
    //boxShadow: '0 -1px 6px 2px rgb(255, 255, 255, 1)',
  }
    return (
    <div style = {cardStyle} >
        Placeholder card
    </div>
  );
}

export default PostCard;