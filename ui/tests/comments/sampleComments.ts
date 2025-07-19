import {Comment} from "../../src/types/models/Comment";

export const sampleComments: Comment[] = [
  // Root comments
  {
    id: 'c1',
    createdAt: '2025-07-15T10:00:00Z',
    name: 'Alice',
    avatar: 'https://example.com/a.png',
    content: 'Primer comentario',
    parentId: null,
    postId: 'post1',
  },
  {
    id: 'c2',
    createdAt: '2025-07-14T09:00:00Z',
    name: 'Bob',
    avatar: 'https://example.com/b.png',
    content: 'Otro comentario root',
    parentId: null,
    postId: 'post1',
  },
  {
    id: 'c3',
    createdAt: '2024-12-01T08:00:00Z',
    name: 'Carol',
    avatar: 'https://example.com/c.png',
    content: 'Comentario viejo',
    parentId: null,
    postId: 'post1',
  },

  // Nivel 1 replies (hijos de root)
  {
    id: 'c4',
    createdAt: '2025-07-15T10:30:00Z',
    name: 'Dave',
    avatar: 'https://example.com/d.png',
    content: 'Respuesta a c1',
    parentId: 'c1',
    postId: 'post1',
  },
  {
    id: 'c5',
    createdAt: '2025-07-15T11:00:00Z',
    name: 'Eva',
    avatar: 'https://example.com/e.png',
    content: 'Otra respuesta a c1',
    parentId: 'c1',
    postId: 'post1',
  },
  {
    id: 'c6',
    createdAt: '2025-07-14T10:00:00Z',
    name: 'Frank',
    avatar: 'https://example.com/f.png',
    content: 'Respuesta a c2',
    parentId: 'c2',
    postId: 'post1',
  },

  // Nivel 2 replies
  {
    id: 'c7',
    createdAt: '2025-07-15T12:00:00Z',
    name: 'Grace',
    avatar: 'https://example.com/g.png',
    content: 'Respuesta a c4',
    parentId: 'c4',
    postId: 'post1',
  },
  {
    id: 'c8',
    createdAt: '2025-07-15T12:30:00Z',
    name: 'Heidi',
    avatar: 'https://example.com/h.png',
    content: 'Respuesta a c5',
    parentId: 'c5',
    postId: 'post1',
  },
  {
    id: 'c9',
    createdAt: '2025-07-14T11:00:00Z',
    name: 'Ivan',
    avatar: 'https://example.com/i.png',
    content: 'Respuesta a c6',
    parentId: 'c6',
    postId: 'post1',
  },

  // Nivel 3 replies
  {
    id: 'c10',
    createdAt: '2025-07-15T13:00:00Z',
    name: 'Judy',
    avatar: 'https://example.com/j.png',
    content: 'Respuesta a c7',
    parentId: 'c7',
    postId: 'post1',
  },
  {
    id: 'c11',
    createdAt: '2025-07-15T13:10:00Z',
    name: 'Karl',
    avatar: 'https://example.com/k.png',
    content: 'Respuesta a c8',
    parentId: 'c8',
    postId: 'post1',
  },

  // Nivel 4 (máxima profundidad)
  {
    id: 'c12',
    createdAt: '2025-07-15T14:00:00Z',
    name: 'Laura',
    avatar: 'https://example.com/l.png',
    content: 'Respuesta profunda a c10',
    parentId: 'c10',
    postId: 'post1',
  },

  // Más comentarios para volumen
  {
    id: 'c13',
    createdAt: '2025-06-30T10:00:00Z',
    name: 'Mona',
    avatar: 'https://example.com/m.png',
    content: 'Comentario aislado',
    parentId: null,
    postId: 'post1',
  },
  {
    id: 'c14',
    createdAt: '2025-07-01T09:00:00Z',
    name: 'Nick',
    avatar: 'https://example.com/n.png',
    content: 'Respuesta a c13',
    parentId: 'c13',
    postId: 'post1',
  },
  {
    id: 'c15',
    createdAt: '2025-07-02T09:00:00Z',
    name: 'Olivia',
    avatar: 'https://example.com/o.png',
    content: 'Nieto de c13',
    parentId: 'c14',
    postId: 'post1',
  },

  // Comentarios huérfanos (padre eliminado o inexistente)
  {
    id: 'c16',
    createdAt: '2025-07-12T08:00:00Z',
    name: 'Peter',
    avatar: 'https://example.com/p.png',
    content: 'Hijo de comentario eliminado',
    parentId: 'deleted123',
    postId: 'post1',
  },

  // Más raíces
  {
    id: 'c17',
    createdAt: '2023-01-01T00:00:00Z',
    name: 'Quinn',
    avatar: 'https://example.com/q.png',
    content: 'Comentario muy viejo',
    parentId: null,
    postId: 'post1',
  },
  {
    id: 'c18',
    createdAt: '2025-07-18T09:30:00Z',
    name: 'Rachel',
    avatar: 'https://example.com/r.png',
    content: 'Comentario más reciente',
    parentId: null,
    postId: 'post1',
  },
  {
    id: 'c19',
    createdAt: '2025-07-18T10:00:00Z',
    name: 'Steve',
    avatar: 'https://example.com/s.png',
    content: 'Respuesta a Rachel',
    parentId: 'c18',
    postId: 'post1',
  },
  {
    id: 'c20',
    createdAt: '2025-07-18T11:00:00Z',
    name: 'Trudy',
    avatar: 'https://example.com/t.png',
    content: 'Respuesta a Steve',
    parentId: 'c19',
    postId: 'post1',
  },
]

export const singleRootNoReplies: Comment[] = [
  {
    id: 'r1',
    createdAt: '2025-07-01T10:00:00Z',
    name: 'User1',
    avatar: '',
    content: 'Solo root',
    parentId: null,
    postId: 'post1',
  },
]

export const multipleRootsWithOrder: Comment[] = [
  {
    id: 'r1',
    createdAt: '2025-07-10T09:00:00Z',
    name: 'User A',
    avatar: '',
    content: 'Viejo',
    parentId: null,
    postId: 'post1',
  },
  {
    id: 'r2',
    createdAt: '2025-07-15T09:00:00Z',
    name: 'User B',
    avatar: '',
    content: 'Más nuevo',
    parentId: null,
    postId: 'post1',
  },
]

export const deepNestedThread: Comment[] = [
  { id: 'c1', createdAt: '2025-07-10T10:00:00Z', name: 'L1', avatar: '', content: '1', parentId: null, postId: 'p' },
  { id: 'c2', createdAt: '2025-07-10T10:01:00Z', name: 'L2', avatar: '', content: '2', parentId: 'c1', postId: 'p' },
  { id: 'c3', createdAt: '2025-07-10T10:02:00Z', name: 'L3', avatar: '', content: '3', parentId: 'c2', postId: 'p' },
  { id: 'c4', createdAt: '2025-07-10T10:03:00Z', name: 'L4', avatar: '', content: '4', parentId: 'c3', postId: 'p' },
  { id: 'c5', createdAt: '2025-07-10T10:04:00Z', name: 'L5', avatar: '', content: '5', parentId: 'c4', postId: 'p' },
]


export const orphanComments: Comment[] = [
  {
    id: "1",
    parentId: null,
    createdAt: "2023-01-01T10:00:00Z",
    name: "Juan",
    avatar: "https://example.com/avatar1.png",
    content: "Comentario raíz",
    postId: 'post-1'
  },
  {
    id: "2",
    parentId: "999", // padre no existe
    createdAt: "2023-01-01T11:00:00Z",
    name: "Ana",
    avatar: "https://example.com/avatar2.png",
    content: "Comentario huérfano",
    postId: 'post-1'
  },
];