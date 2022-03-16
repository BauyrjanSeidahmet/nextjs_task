import styles from '../styles/Home.module.css'
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import Post from '../components/Post';

export default function Home({ launches }) {
  return (
    <div className={styles.container}>
     <h1>Posts</h1>
      <div>
      {
        launches?.links?.map(post => {
          return <Post
            key={post.id}
            author={post.postedBy.name}
            description={post.description}
          />
        })
      }
      </div>
    </div>
  )
}

export async function getStaticProps() {
  const client = new ApolloClient({
    uri: 'https://api.vrmarketing.guru',
    cache: new InMemoryCache()
  });

  const { data } = await client.query({
    query: gql`
        query {
          feed {
            count
            links {
              id
              description
              url
              postedBy {
                id
                name
              }
              votes {
                id
                user {
                  id
                  name
                }
              }
            }
          }
        }
    `
  });

  return {
    props: {
      launches: data.feed
    }
  }
}
