import React, { CSSProperties } from 'react';

interface PostCardProps {}

const PostCard = (props: PostCardProps) => {
  //what does cssproperties do again?
  const cardStyle: CSSProperties = {
    //**style of the card**
    display: 'flex',
    //aligns the text to the top left of the screen
    flexDirection: 'column',

    //**layout of the card**
    padding: '16px',
    margin: '64px auto',
    marginTop: '100px',
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

  const headerStyle: CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between', // Puts name on left, date on right
    marginBottom: '12px',
    borderBottom: '1px solid #ffffff', // Subtle separator
    paddingBottom: '8px',
    fontSize: '0.9rem',
    color: '#cbd5e0'
  };

  const titleStyle: CSSProperties = {
    //rem units adjust according to the root element, so the font here will change if we change
    //the root font. We should use the globals.css file for setting our root font and import it 
    //whenever we want to use it.
    fontSize: '1.5rem',
    fontWeight: 'bold',
    marginBottom: '8px'
  };

    return (
    //className imports the given style from globals.css
    <div className= "component-style" style = {cardStyle} >
      <div style={headerStyle}>
        <strong>username</strong>
        <span>date</span>
      </div>
      <div style = {titleStyle}>
        Post Title
      </div>
        Main body of post
    </div>
  );
}

export default PostCard;

//position: fixed will ignore margins of other components, leading to problems later. adding a
//padding to the top of the page the same width as the header would fix this for now