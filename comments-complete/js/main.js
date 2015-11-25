'use strict';

// Some initial Posts with Comments
var POST_DATA = [
    {
        postText: 'Ah, it is SO nice outside today!',
        user: 'Rebecca Smith',
        comments: [
            {
                commentText: 'Are you serious? Washington weather sucks.',
                user: 'Austin Gebauer',
                date: new Date()
            }
        ]
    },
    {
        postText: 'Ermahgerd, pumpkin spice latte is back.',
        user: 'Austin Gebauer',
        comments: [
            {
                commentText: 'Who wants pumpkin in their coffee?',
                user: 'A Pumpkin',
                date: new Date()
            }
        ]
    }
];

// All Posts
var Posts = React.createClass({
    getInitialState: function() {
        return {
            posts: this.props.posts,
            userPost: ''
        };
    },
    render: function() {
        // create posts
        var posts = this.state.posts.map(function(post, index) {
            return ( <Post key={index} post={post} /> );
        });

        return (
            <div>
                <section id='post-form-wrapper'>
                    <p>Write a post</p>
                    <form id='post-form' onSubmit={this.submitPostEvent}>
                        <input type='text' 
                        onChange={this.postChangeEvent}
                        placeholder="What's on your mind?"
                        name='post' 
                        value={this.state.userPost} />
                    </form>
                </section>
                <ul>
                    {posts}
                </ul>
            </div>
        );
    },  // End of lifecycle functions
    postChangeEvent: function(event) {
        this.setState({
            userPost: event.target.value
        });
    },
    submitPostEvent: function(event) {
        event.preventDefault();

        if(this.state.userPost) {
            // build new post
            var post = {
                postText: this.state.userPost,
                user: 'Anonymous User',
                comments: []
            };

            // set state with new post added to posts
            // clear userPost, which is the input field's value
            this.setState({
                posts: this.state.posts.concat(post),
                userPost: ''
            });
        }

        return false;
    }
});

// A single Post has a PostBody and Comments
var Post = React.createClass({
    render: function() {
        return ( 
            <li className='post'>
                <PostBody user={this.props.post.user} text={this.props.post.postText} />
                <Comments comments={this.props.post.comments} />
            </li>
        );
    }
});

// The body of a Post
var PostBody = React.createClass({
    render: function() {
        return (
            <div className='post-body'>
                <h3>{this.props.user}</h3>
                <p>{this.props.text}</p>
            </div>
        );
    }
});

// All Comments
// Form to submit a Comment
var Comments = React.createClass({
    getInitialState: function() {
        return {
            comments: this.props.comments,
            userComment: ''
        };
    },
    render: function() {
        var comments = this.state.comments.map(function(comment, index) {
            return ( 
                <Comment key={index} 
                    user={comment.user} 
                    text={comment.commentText} 
                    date={comment.date} /> 
            );
        });

        return (
            <section className='comments-wrapper'>
                <ul className='comments'>
                    {comments}
                </ul>
                <form className='comments-form' onSubmit={this.postComment}>
                    <input type='text' 
                        onChange={this.commentChangeEvent}
                        placeholder='Write a comment...' 
                        name='comment' 
                        value={this.state.userComment} />
                </form>
            </section>
        );
    },  // End of lifecycle functions
    commentChangeEvent: function(event) {
        this.setState({
            userComment: event.target.value
        });
    },
    postComment: function(event) {
        event.preventDefault();

        if(this.state.userComment) {
            // build new comment
            var comment = {
                commentText: this.state.userComment,
                user: 'Anonymous User',
                date: new Date() // could use getDefaultProps
            };

            // set state with new comment added to comments
            // clear userComment, which is the input field's value
            this.setState({
                comments: this.state.comments.concat([comment]),
                userComment: ''
            });
        }

        return false;
    }
});

// A single Comment
var Comment = React.createClass({
    render: function() {
        return (
            <li className='comment'>
                <span><b>{this.props.user}</b>&nbsp;</span>
                <span>{this.props.text}</span>
                <p>{this.props.date.toLocaleString()}</p>
            </li>
        );
    }
});

var mountNode = document.getElementById('posts-container');

// Render Posts in the mountNode
ReactDOM.render(<Posts posts={POST_DATA} />, mountNode);
