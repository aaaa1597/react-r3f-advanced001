# react-r3f-advanced001
React+TypeScript+R3Fのtutorial応用編1(annotations, GLTFSX, SVG)

## 技術のポイント
- Drei tween.js annotations
- GLTFSXをつかう。
- SVG描画
- アノテーション

![](https://storage.googleapis.com/zenn-user-upload/b51d6b3d5a1a-20231230.png)

# 結構ハマったので、履歴。
javascript → typescriptに変更するのにハマったこと。

- 子要素つけろって怒られた!! 解決方法は[ココ](https://qiita.com/aaaa1597/items/497e2a5007c64bdfa804#19property-children-is-missing-in-type--camera--position-number-number-number---but-required-in-type-canvaspropsts2741-canvasdts5-5-children-is-declared-here)。

- 型違いで、怒られた!! 解決方法は[ココ](https://qiita.com/aaaa1597/items/497e2a5007c64bdfa804#20type-mutablerefobject-is-not-assignable-to-type-ref--undefined-type-mutablerefobject-is-not-assignable-to-type-refobjectthe-types-of-currentobject-are-incompatible-between-these-types-type-perspectivecamera--orthographiccamera--undefined-is-not-assignable-to-type-perspectivecamera--orthographiccamera-type-undefined-is-not-assignable-to-type-perspectivecamera--orthographiccamerats2322-indexdts119-9-the-expected-type-comes-from-property-ref-which-is-declared-here-on-type-intrinsicattributes--orbitcontrolsprops--refattributes)

- propsを受け取る関数コンポーネントが分からんかった。
  - ポイント1. 関数コンポーネントに引数を追加するときは、Propsの型定義をする。
  - ポイント2. 関数コンポーネントを渡すときは、バラした状態になる。
  - ポイント3. useRefの型は、React.MutableRefObject<なんちゃら>。

```ts:App.tsx
import { OrbitControls as OrbitControlsImpl } from "three-stdlib"

//                   ↓ポイント1        ↓ポイント3
const Annotations = (props: {controls: React.MutableRefObject<OrbitControlsImpl>}) => {
  return (
    <>
    </>
  )
}

  const ref = useRef<OrbitControlsImpl>(null!)
  <Annotations controls={ref} />
//             ↑ポイント2
```

- propsを受け取る関数コンポーネントが分からんかった。

