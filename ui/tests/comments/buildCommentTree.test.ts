import { describe, it, expect } from "vitest";
import { buildCommentTree } from "../../src/hooks/useCommentTree";
import { deepNestedThread, multipleRootsWithOrder, orphanComments, singleRootNoReplies } from "./sampleComments";

describe("buildCommentTree", () => {
  
  it('devuelve una lista vacía cuando no hay comentarios', () => {
    const tree = buildCommentTree([])
    expect(tree).toEqual([])
  })

  it("caso simple: un root sin respuestas", () => {
    const tree = buildCommentTree(singleRootNoReplies);
    expect(tree).toHaveLength(1);
    expect(tree[0].id).toBe("r1");
    expect(tree[0].children).toHaveLength(0);
  });

  it("caso múltiple: varios roots ordenados por fecha descendente", () => {
    const tree = buildCommentTree(multipleRootsWithOrder);
    expect(tree).toHaveLength(2);

    // r2 es más reciente que r1
    expect(tree[0].id).toBe("r2");
    expect(tree[1].id).toBe("r1");

    expect(tree[0].children).toHaveLength(0);
    expect(tree[1].children).toHaveLength(0);
  });

  it("caso profundo: hilo con 5 niveles de profundidad", () => {
    const tree = buildCommentTree(deepNestedThread);

    expect(tree).toHaveLength(1);
    expect(tree[0].id).toBe("c1");

    // Nivel 1
    const l1 = tree[0];
    expect(l1.children[0].id).toBe("c2");

    // Nivel 2
    const l2 = l1.children[0];
    expect(l2.children[0].id).toBe("c3");

    // Nivel 3
    const l3 = l2.children[0];
    expect(l3.children[0].id).toBe("c4");

    // Nivel 4
    const l4 = l3.children[0];
    expect(l4.children[0].id).toBe("c5");

    // Nivel 5
    const l5 = l4.children[0];
    expect(l5.children).toHaveLength(0);
  });

  it("Deberia ignorar hijos de comentarios eliminados", () => {
    const tree = buildCommentTree(orphanComments);

    expect(tree).toHaveLength(1);
    expect(tree[0].id).toBe("1");
  });
});
