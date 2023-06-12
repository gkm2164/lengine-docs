import { writeFile, existsSync, mkdirSync, writeFileSync } from 'fs';

const navs = [
    {
      title: 'Home',
      link: { href: '/' },
      links: [],
    },
    {
      title: 'Introduction',
      links: [
        {href: '/introduction/purpose', children: 'Purpose of the language'},
        {href: '/introduction/key-features', children: 'Key features and design goals'},
        {href: '/introduction/history', children: 'Brief history and development'},
      ],
    },
    {
      title: 'Getting Started',
      links: [
        { href: '/getting-started/install', children: 'Installing the language' },
        { href: '/getting-started/basic', children: 'Basic syntax and structure' },
        { href: '/getting-started/helloworld', children: 'Hello, Lengine!'}
      ],
    },
    {
      title: 'Data Types',
      links: [
        {href: '/data-types/numeric', children: 'Numeric data types'},
        {href: '/data-types/boolean', children: 'Boolean data type'},
        {href: '/data-types/char-strings', children: 'Character and strings'},
        {href: '/data-types/list-sequence', children: 'List and Sequence'},
        {href: '/data-types/set-map', children: 'Set and Map'},
      ],
    },
    {
      title: 'Functions and Control Structures',
      links: [
        {href:'/funcs/define', children: 'Defining and calling functions'},
        {href:'/funcs/cnditions', children: 'Conditional expressions'},
        {href:'/funcs/loops', children: 'Loops and iteration'},
        {href:'/funcs/tailrec', children: 'Tail recursion optimization'},
      ],
    },
    {
      title: 'Higher-Order Functions',
      links: [
        {href:'/higher-order/first-class', children: 'Functions as first-class objects'},
        {href:'/higher-order/compose-currying', children: 'Function composition and currying'},
        {href:'/higher-order/anonymous-clojures', children: 'Anonymous functions and closures'},
      ],
    },
    {
      title: 'Lazy Evaluation',
      links: [
        {href: '/lazy-eval/lazy-and-force', children: 'Lazy and Force'},
        {href: '/lazy-eval/stream', children: 'Stream'}
      ]
    },
    {
      title: 'Error Handling and Debugging',
      links: [
        {href: '/err/exceptions', children: 'Exceptions and error handling'},
        {href: '/err/tdd', children: 'Testing and test-driven development'}
      ],
    },
    {
      title: 'Macro',
      links: [
        {href: '/macro/intro', children: 'Introduction to Macro'},
      ],
    },
    {
      title: 'Advanced Topics',
      links: [
        {href: '/adv/interoperability', children: 'Interoperability with other languages'}
      ],
    },
    {
      title: 'Conclusion',
      links: [
        {href: '/conclusion/future-plans', children: 'Future development and roadmap'},
        {href: '/conclusion/additional-resources', children: 'Additional resources and references'}
      ],
    }
  ];

writeFile('navs.json', JSON.stringify(navs), (err) => {
  if (err) throw err;
});

const toBeCreated = [];

for (let i = 1; i < navs.length; i++) {
  navs[i].links.forEach(link => {
    const loc = link.href;
    const title = link.children;

    toBeCreated.push({
      location: loc,
      title: title
    });
  })
}

console.log(toBeCreated);

const root = '../pages';

const formatString = (title) => `---
title: ${title}
---

# {% $markdoc.frontmatter.title %}
`

toBeCreated.forEach(({location, title}) => {
  const [_, folder, file] = location.split("/");

  const loc = `${root}/${folder}`
  if (!existsSync(loc)) {
    mkdirSync(loc);
  }

  const fullPath = `${loc}/${file}.md`;

  if (existsSync(fullPath)) {
    console.log(`${fullPath} exists.`)
  } else {
    console.error(`${fullPath} not exists.`)

    writeFileSync(fullPath, formatString(title));
  }
});