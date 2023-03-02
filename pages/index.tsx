import Link from "next/link";

export default function Home() {
  return <div>
    <h1>漢字パズル</h1>
    <h2>和同開珎 | 和同開珎てきなやつ</h2>
    <Link href="/play/wadou-random"><p>ランダムな問題 | random play</p></Link>
    <p>ランダムな問題を作成し出します</p>
    <h3>遊び方</h3>
    <ul>
      <li>回答入力欄に答えをいれます</li>
      <li>杖みたになアイコンを押します</li>
    </ul>
    <p>赤の文字が一つでもある場合は不正解です、ランプのアイコンを押すと正解が表示されます、矢印のアイコンを押すことで問題間を移動出来ます</p>
    <h3>アイコンの説明</h3>
    <div style={{display: "flex", alignItems: "center"}}>
      <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-wand" width="44" height="44" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#6f32be" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <polyline points="6 21 21 6 18 3 3 18 6 21" />
        <line x1="15" y1="6" x2="18" y2="9" />
        <path d="M9 3a2 2 0 0 0 2 2a2 2 0 0 0 -2 2a2 2 0 0 0 -2 -2a2 2 0 0 0 2 -2" />
        <path d="M19 13a2 2 0 0 0 2 2a2 2 0 0 0 -2 2a2 2 0 0 0 -2 -2a2 2 0 0 0 2 -2" />
      </svg>
      <p>答え合わせをします</p>
    </div>
    <div style={{display: "flex", alignItems: "center"}}>
      <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-bulb" width="44" height="44" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#f1c40f" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M3 12h1m8 -9v1m8 8h1m-15.4 -6.4l.7 .7m12.1 -.7l-.7 .7" />
        <path d="M9 16a5 5 0 1 1 6 0a3.5 3.5 0 0 0 -1 3a2 2 0 0 1 -4 0a3.5 3.5 0 0 0 -1 -3" />
        <line x1="9.7" y1="17" x2="14.3" y2="17" />
      </svg>
      <p>答えを表示します</p>
    </div>
    <h2>ペンシルパズルの一種 | 漢字探すやつ</h2>
    <Link href="/play/find"><p>遊ぶ | play</p></Link>
    <h3>使い方</h3>
    <p>問題のデータを読み込みます</p>
    <p>{'(更に詳しく知りたい人の為に。gzipされたURIEncodeされたbase64を解凍し文字列のjsonをparseしjsのobjectに変換し使用しています。code: JSON.parse(decodeURIComponent(unzipSync(Buffer.from(data.replaceAll("-","+").replaceAll("_","/"), "base64")).toString("utf-8")))　　　)'}</p>
    <Link href="/create/find"><p>問題を作る | create</p></Link>
    <h3>使い方</h3>
    <p>レベルを数字で入力し(デフォルトで0が入っているやつ)くるくる回っている矢印アイコンを押しランダムに配置し、アーケードなアイコンを押したら新しくタブが開かれそのタブで遊びます</p>
    <h3>アイコンの説明</h3>
    <div style={{display: "flex", alignItems: "center"}}>
      <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-rotate-clockwise" width="44" height="44" viewBox="0 0 24 24" strokeWidth="2" stroke="#0070f3" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
          <path d="M4.05 11a8 8 0 1 1 .5 4m-.5 5v-5h5" />
      </svg>
      <p>ランダムにシャッフルします</p>
    </div>
    <div style={{display: "flex", alignItems: "center"}}>
      <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-brand-apple-arcade" width="44" height="44" viewBox="0 0 24 24" strokeWidth="2" stroke="#6f32be" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <circle cx="12" cy="5" r="2" />
        <path d="M20 12.5v4.75a0.734 .734 0 0 1 -.055 .325a0.704 .704 0 0 1 -.348 .366l-5.462 2.58a4.998 4.998 0 0 1 -4.27 0l-5.462 -2.58a0.705 .705 0 0 1 -.401 -.691l-.002 -4.75" />
        <path d="M4.431 12.216l5.634 -2.332a5.065 5.065 0 0 1 3.87 0l5.634 2.332a0.692 .692 0 0 1 .028 1.269l-5.462 2.543a5.064 5.064 0 0 1 -4.27 0l-5.462 -2.543a0.691 .691 0 0 1 .028 -1.27z" />
        <line x1="12" y1="7" x2="12" y2="13" />
      </svg>
      <p>プレイ用の新しいタブを開きます</p>
    </div>
    <p></p>
    <Link href="/create/find?data=H4sIAAAAAAAAA41Sy2rEMAz8mrln87J0lB3nPxb2XmgLbf--kpwl0abQQAKyR9KMPELK6Ptv_THIrUNfNPxpx7GdHvfPe7vAZMmoE2QBd6gjcgVn1BlcIMWgrNCAShACdRbwDcQG8QRaURmiN8XLC1hQE8RbaXOntGTSjwziEexVNFhPo9Dy7A070OLJ_AxWh_R4s8ImVWZTKJ3xHimUVNIhR7mS8Wo5q8gmY7bYoOIyNLkie0NLXj2YkX1SIz1O4QPKauU6y1ZFpqTNlbMH2lM28Tl5FZlUe8PZIbKhcruRjWJaGsvX2_vj4x9_dkUno3bo5NjxqV6sexnxooc7dDIzcEVXQ8NobzDzss87dDI8cEXnQ8O4AuF5L-9CqIpLERTG7QgN45ocrfxzX9LyC3Qk14LvAwAA">
      <p>サンプル問題を遊ぶ | example</p>
    </Link>
    <p></p>
    <h2>漢字検索 | さがすやつ</h2>
    <Link href="/search"><p>調べる | search</p></Link>
    <h3>使い方</h3>
    <p>問題の自動生成などに使われている単語を検索します、漢字一文字を入力しボタンを押します</p>
    <ul>
      <li>first-searchは一文字目が入力された文字と一致する単語を検索します</li>
      <li>last-searchは二文字目が入力された文字と一致する単語を検索します</li>
    </ul>
  </div>
}
