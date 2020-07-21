import React from 'react';
import { PageProps, graphql } from 'gatsby';

import Bio from '../components/bio';
import Layout from '../components/layout';
import SEO from '../components/seo';
import Hero from '../components/hero';
import Post, { Node } from '../components/post';

type Data = {
  site: {
    siteMetadata: {
      title: string;
    };
  };
  allMarkdownRemark: {
    edges: {
      node: Node;
    }[];
  };
};

const BlogIndex: React.FC<PageProps<Data>> = ({ data }) => {
  const posts = data.allMarkdownRemark.edges;

  return (
    <Layout>
      <SEO title="All posts" />
      <Hero />
      <Bio />
      {posts.map(({ node }) => (
        <Post node={node} key={node.fields.slug} />
      ))}
    </Layout>
  );
};

export default BlogIndex;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
            tags
          }
          html
        }
      }
    }
  }
`;
