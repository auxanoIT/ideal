import { groq } from "next-sanity";

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0]{
    name,
    shortName,
    description,
    phone,
    email,
    address,
    city,
    country,
    whatsappSales,
    whatsappSupport,
    hubspotMeetingUrl
  }
`;

export const navigationQuery = groq`
  *[_type == "navigation"][0].items[]{
    label,
    href,
    kind,
    description,
    children[]{
      label,
      href,
      description
    }
  }
`;

export const footerQuery = groq`
  *[_type == "footer"][0].columns[]{
    title,
    links[]{
      label,
      href,
      description
    }
  }
`;

export const marketingPageQuery = groq`
  *[_type == "page" && slug.current == $slug][0]{
    title,
    description,
    "slug": slug.current,
    sections[]{...}
  }
`;

export const servicesQuery = groq`
  *[_type == "service"] | order(title asc) {
    title,
    category,
    summary,
    description,
    positioning,
    outcome,
    heroLabel,
    highlights,
    capabilities,
    deliverables,
    industries,
    serviceMixId,
    navDescription,
    navImage,
    "slug": slug.current
  }
`;

export const serviceSlugsQuery = groq`
  *[_type == "service" && defined(slug.current)].slug.current
`;

export const serviceQuery = groq`
  *[_type == "service" && slug.current == $slug][0]{
    title,
    category,
    summary,
    description,
    positioning,
    outcome,
    heroLabel,
    highlights,
    capabilities,
    deliverables,
    industries,
    serviceMixId,
    navDescription,
    navImage,
    "slug": slug.current
  }
`;

export const caseStudiesQuery = groq`
  *[_type == "caseStudy" && published == true] | order(title asc) {
    title,
    client,
    industry,
    location,
    "image": select(
      defined(heroImage.asset) => {
        "src": heroImage.asset->url,
        "alt": coalesce(heroImage.alt, title)
      }
    ),
    summary,
    challenge,
    solution,
    result,
    metrics,
    relatedServices,
    published,
    featured,
    projectDate,
    outcome,
    quote,
    "slug": slug.current
  }
`;

export const caseStudySlugsQuery = groq`
  *[_type == "caseStudy" && published == true && defined(slug.current)].slug.current
`;

export const caseStudyQuery = groq`
  *[_type == "caseStudy" && slug.current == $slug && published == true][0]{
    title,
    client,
    industry,
    location,
    "image": select(
      defined(heroImage.asset) => {
        "src": heroImage.asset->url,
        "alt": coalesce(heroImage.alt, title)
      }
    ),
    summary,
    challenge,
    solution,
    result,
    metrics,
    relatedServices,
    published,
    featured,
    projectDate,
    outcome,
    quote,
    "slug": slug.current
  }
`;

export const blogPostsQuery = groq`
  *[_type == "post"] | order(publishedAt desc) {
    title,
    category,
    publishedAt,
    readingTime,
    author,
    excerpt,
    "coverImage": select(
      defined(coverImage.asset) => {
        "src": coverImage.asset->url,
        "alt": coverImage.alt
      }
    ),
    "takeaways": coalesce(takeaways, []),
    "body": coalesce(body[]{
      _type == "string" => @,
      _type == "block" => {
        ...,
        children[]{...},
        markDefs[]{...}
      },
      _type == "blogPlainText" => {
        _type,
        text
      },
      _type == "blogHeading" => {
        _type,
        text,
        level,
        anchor
      },
      _type == "blogParagraph" => {
        _type,
        text
      },
      _type == "blogList" => {
        _type,
        style,
        items
      },
      _type == "blogCallout" => {
        _type,
        tone,
        title,
        text
      },
      _type == "blogQuote" => {
        _type,
        quote,
        attribution
      },
      _type == "blogTable" => {
        _type,
        caption,
        columns,
        rows[]{
          cells
        }
      },
      _type == "image" => {
        _type,
        _key,
        caption,
        "image": select(
          defined(asset) => {
            "src": asset->url,
            "alt": coalesce(alt, caption, "Blog image"),
            "width": asset->metadata.dimensions.width,
            "height": asset->metadata.dimensions.height
          }
        )
      },
      _type == "blogImageBlock" => {
        _type,
        caption,
        "image": {
          "src": image.asset->url,
          "alt": image.alt,
          "width": image.asset->metadata.dimensions.width,
          "height": image.asset->metadata.dimensions.height
        }
      }
    }, []),
    "slug": slug.current
  }
`;

export const blogPostSlugsQuery = groq`
  *[_type == "post" && defined(slug.current)].slug.current
`;

export const blogPostQuery = groq`
  *[_type == "post" && slug.current == $slug][0]{
    title,
    category,
    publishedAt,
    readingTime,
    author,
    excerpt,
    "coverImage": select(
      defined(coverImage.asset) => {
        "src": coverImage.asset->url,
        "alt": coverImage.alt
      }
    ),
    "takeaways": coalesce(takeaways, []),
    "body": coalesce(body[]{
      _type == "string" => @,
      _type == "block" => {
        ...,
        children[]{...},
        markDefs[]{...}
      },
      _type == "blogPlainText" => {
        _type,
        text
      },
      _type == "blogHeading" => {
        _type,
        text,
        level,
        anchor
      },
      _type == "blogParagraph" => {
        _type,
        text
      },
      _type == "blogList" => {
        _type,
        style,
        items
      },
      _type == "blogCallout" => {
        _type,
        tone,
        title,
        text
      },
      _type == "blogQuote" => {
        _type,
        quote,
        attribution
      },
      _type == "blogTable" => {
        _type,
        caption,
        columns,
        rows[]{
          cells
        }
      },
      _type == "image" => {
        _type,
        _key,
        caption,
        "image": select(
          defined(asset) => {
            "src": asset->url,
            "alt": coalesce(alt, caption, "Blog image"),
            "width": asset->metadata.dimensions.width,
            "height": asset->metadata.dimensions.height
          }
        )
      },
      _type == "blogImageBlock" => {
        _type,
        caption,
        "image": {
          "src": image.asset->url,
          "alt": image.alt,
          "width": image.asset->metadata.dimensions.width,
          "height": image.asset->metadata.dimensions.height
        }
      }
    }, []),
    "slug": slug.current
  }
`;

export const testimonialsQuery = groq`
  *[_type == "testimonial"] | order(_createdAt desc) {
    quote,
    name,
    role,
    company
  }
`;

export const faqsQuery = groq`
  *[_type == "faq"] | order(order asc) {
    id,
    question,
    answer
  }
`;

export const estimatorConfigQuery = groq`
  *[_type == "estimatorConfig"][0]{
    companySizes,
    locationBands,
    supportTiers,
    cameraBands,
    networkScopes,
    complianceLevels,
    services,
    contingencyLow,
    contingencyHigh
  }
`;

export const careerOpeningsQuery = groq`
  *[_type == "careerOpening" && coalesce(isOpen, true) == true] | order(order asc, _createdAt desc) {
    title,
    location,
    employmentType,
    department,
    summary
  }
`;
