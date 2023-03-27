import React from 'react';
import {useRouter} from 'next/router';
import Link from 'next/link';

const items = [
  {
    title: 'Home',
    link: { href: '/' },
    links: [],
  },
  {
    title: 'Introduction',
    links: [
      {href: '', children: 'Purpose of the language'},
      {href: '', children: 'Key features and design goals'},
      {href: '', children: 'Brief history and development'},
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
      {href:'', children: 'Defining and calling functions'},
      {href:'', children: 'Conditional expressions'},
      {href:'', children: 'Loops and iteration'},
      {href:'', children: 'Tail recursion optimization'},
    ],
  },
  {
    title: 'Higher-Order Functions',
    links: [
      {href:'', children: 'Functions as first-class objects'},
      {href:'', children: 'Function composition and currying'},
      {href:'', children: 'Anonymous functions and closures'},
    ],
  },
  {
    title: 'Lazy Evaluation',
    links: [
      {href: '', children: 'Lazy and Force'},
      {href: '', children: 'Stream'}
    ]
  },
  {
    title: 'Error Handling and Debugging',
    links: [
      {href: '', children: 'Exceptions and error handling'},
      {href: '', children: 'Testing and test-driven development'}
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
      {href: '', children: 'Interoperability with other languages'}
    ],
  },
  {
    title: 'Conclusion',
    links: [
      {href: '', children: 'Future development and roadmap'},
      {href: '', children: 'Additional resources and references'}
    ],
  }
];

export function SideNav() {
  const router = useRouter();
  return (
    <nav className="sidenav">
      {items.map((item) => (
        <div key={item.title}>
          <span>{item.link ? <Link href={item.link.href} className={router.pathname === item.link.href ?'active': ''}>{item.title}</Link> : <>{item.title}</>}</span>
          <ul className="flex column">
            {item.links.map((link) => {
              const active = router.pathname === link.href;
              return (
                <li key={link.href} className={active ? 'active' : ''}>
                  <Link {...link} />
                </li>
              );
            })}
          </ul>
        </div>
      ))}
      <style jsx>
        {`
          nav {
            position: sticky;
            top: var(--top-nav-height);
            height: calc(100vh - var(--top-nav-height));
            flex: 0 0 auto;
            overflow-y: auto;
            padding: 2.5rem 2rem 2rem;
            border-right: 1px solid var(--border-color);
          }
          span {
            font-size: larger;
            font-weight: 500;
            padding: 0.5rem 0 0.5rem;
          }
          ul {
            padding: 0;
          }
          li {
            list-style: none;
            margin: 0;
          }
          li :global(a) {
            text-decoration: none;
          }
          li :global(a:hover),
          li.active :global(a) {
            text-decoration: underline;
          }
        `}
      </style>
    </nav>
  );
}
