import React, { CSSProperties } from 'react';
import {Post, Profile} from '../lib/dbSchema'
import { getPost } from '../lib/getData';
import Link from "next/link";
import ReplyButton  from './ReplyButton';

interface PostCardProps {}

const PostCard = async ({ postId }: { postId: string }) => {
  //CSSProperties functions as an autocomplete for CSS rules
  const cardStyle: CSSProperties = {
    //**style of the card**
    display: 'flex',
    //aligns the text to the top left of the screen
    flexDirection: 'column',

    //**layout of the card**
    padding: '16px',
    margin: '64px auto',
    marginTop: '100px',
    marginLeft: 'auto',
    marginRight: 'auto',
    //will adjust the height to fit the text within it
    height: 'auto',
    minHeight: '200px',

    width: 'calc(95% - 300px)', 
    maxWidth: '600px',

    transform: 'translateX(100px)', 
    boxSizing: 'border-box',

    //these lines force a long string of text without space characters to wrap around if the text
    //is too long to fit into the card, preventing it from going off the card
    overflowWrap: 'anywhere', // This is the magic line
    wordBreak: 'break-word'   // A backup for older browsers
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

  //will be used for an actual post
  const post: Post = await getPost(postId);

  //if the post is null, it means there was an error with the database connection or the postId was not found in the database.
  if (!post) {
    return (
      <div style={cardStyle} className="component-style">
        <p>Post #{postId} not found in database.</p>
      </div>
    );
  }

  //a mock post for testing
  // const post = {
  //   id: '1',
  //   poster_id: 'Test User',
  //   date: '2024-05-20',
  //   title: 'Placeholder Title',
  //   content: 'This is what the content will look like once we have the keys!',
  //   category: 'Temp category'
  // };

  // Returns the timestamp in "HH:MM UTC MM/DD/YYYY" format (using 24-hour time for UTC timezone)
  function makeHumanReadable(timestamp: Post["timestamp"]) {
    const parse = timestamp.split(/\D/); // Splits raw timestamp by the non-digit (\D) characters
    return parse[3] + ":" + parse[4] + " UTC " + parse[1] + "/" + parse[2] + "/" + parse[0]
  }

  return (
    //className imports the given style from globals.css
      <div className= "component-style" style = {cardStyle} >
      <div style={headerStyle}>
        <strong>{post.profile.display_name}</strong>
        <span>{makeHumanReadable(post.timestamp)}</span>
      </div>
      <div style = {titleStyle}>
        {post.title}
      </div>
      <Link href={post.music_link} style={{ color: '#63b3ed', textDecoration: 'underline', fontWeight: 'bold' }}>
        {post.music_link ? post.music_link : ''}
      </Link>
      <div>
        {post.content}
      </div>
      <div>
        <ReplyButton
          parent_id={postId}
        />
      </div>
    </div>
    
  );
}

export default PostCard;

//position: fixed will ignore margins of other components, leading to problems later. adding a
//padding to the top of the page the same width as the header would fix this for now