## ベン図に使用している式

n 番目の曲線 C_n の 極座標(r, θ) は以下の式で求めている。  

<img src="https://latex.codecogs.com/gif.latex?C&space;_&space;{n}:&space;r&space;=&space;\begin{cases}&space;1&space;&plus;&space;sin(\frac&space;{\theta}&space;{2\pi})&space;\delta&space;_&space;{n}&space;&&space;\text{&space;if&space;}&space;n&space;=&space;1&space;\\&space;1&space;&plus;&space;cos(2^{n-2}&space;\frac&space;{\theta}&space;{2\pi})&space;\delta&space;_&space;{n}&&space;\text{&space;if&space;}&space;n&space;\geq&space;2&space;\end{cases}&space;~\left&space;(&space;n&space;\in&space;\mathbb{N},&space;~0&space;<&space;\theta&space;\leq&space;2\pi~&space;\right&space;)" title="C _ {n}: r = \begin{cases} 1 + sin(\frac {\theta} {2\pi}) \delta _ {n} & \text{ if } n = 1 \\ 1 + cos(2^{n-2} \frac {\theta} {2\pi}) \delta _ {n}& \text{ if } n \geq 2 \end{cases} ~\left ( n \in \mathbb{N}, ~0 < \theta \leq 2\pi~ \right )" />

## ベン図の作図について（前提）

[N個の集合のベン図が描けること](http://nunuki.hatenablog.com/entry/2017/12/31/175302)の数式を元にして導出しています。

以下、抜粋・要約して記載。

n bitのグレイコードを<img src="https://latex.codecogs.com/gif.latex?G_{n}" title="G_{n}" />とする。  
<img src="https://latex.codecogs.com/gif.latex?m&space;\leq&space;n" title="m \leq n" />のときに
<img src="https://latex.codecogs.com/gif.latex?G_{n}" title="G_{n}" />  のm桁目の数列を横方向に縮め、 連続区間 [0,1) で定義された関数g_m(x) で表します。

>  <img src="https://latex.codecogs.com/gif.latex?g_{m}(x)=&space;\lim_{n&space;\to&space;\infty&space;}&space;\left&space;(&space;G_{n}&space;\right&space;)_{&space;\left&space;\lfloor&space;2^{n-1}x&space;\right&space;\rfloor&space;}" title="g_{m}(x)= \lim_{n \to \infty } \left ( G_{n} \right )_{ \left \lfloor 2^{n-1}x \right \rfloor }" />

> 定理: N-ベン図 の存在
> 実数 δ1,⋯,δN が、 1>δ1>δ2>⋯>δN−1>δN>0 を満たすとき、次の極座標表示で表される曲線C1,⋯,CN はN-ベン図を成す。
>  
> <img src="https://latex.codecogs.com/gif.latex?C&space;_&space;{n}:&space;r&space;=&space;1&space;&plus;&space;\left(2g&space;_&space;{n}&space;\left(&space;\frac&space;{\theta}&space;{2\pi}&space;\right)&space;-&space;1&space;\right)&space;\delta&space;_&space;{n}&space;\;\;\;&space;\cdots&space;(1)" title="C _ {n}: r = 1 + \left(2g _ {n} \left( \frac {\theta} {2\pi} \right) - 1 \right) \delta _ {n} \;\;\; \cdots (1)" />
>  
> ただし、非連続となる部分は動径方向に線分を引くことで連続な閉曲線にするものとする。

> N個の集合のベン図が描けること  http://nunuki.hatenablog.com/entry/2017/12/31/175302 (2019/11/1 閲覧より)

## ベン図の作図についての式

先程の式をなめらかな曲線で描けるように変形させました…がこれによってN個のベン図がかけているかは怪しくなっています。  
まず、グレイコードGnのm桁目の数列について形が似ている下記の式で表します。  
<img src="https://latex.codecogs.com/gif.latex?G_{1}(x)&space;=&space;\frac{sin(x)&space;&plus;&space;1}{2}" title="G_{1}(x) = \frac{sin(x) + 1}{2}" />  

<img src="https://latex.codecogs.com/gif.latex?2&space;\leq&space;m&space;\leq&space;n" title="2 \leq m \leq n" />のとき  
<img src="https://latex.codecogs.com/gif.latex?G_{m}(x)&space;=&space;\frac{cos(2^{m-2}x)&space;&plus;&space;1}{2}" title="G_{m}(x) = \frac{cos(2^{m-2}x) + 1}{2}" />  
とします。
  
(1)の式にそれぞれを当てはめると  
<img src="https://latex.codecogs.com/gif.latex?\begin{align*}&space;C&space;_&space;{1}:&space;r&space;&=&space;1&space;&plus;&space;\left(2&space;\frac{sin(\frac&space;{\theta}&space;{2\pi})&space;&plus;&space;1}{2}&space;-&space;1&space;\right)&space;\delta&space;_&space;{n}&space;\\&space;&=&space;1&space;&plus;&space;sin(\frac&space;{\theta}&space;{2\pi})&space;\delta&space;_&space;{n}&space;\end{align*}" title="\begin{align*} C _ {1}: r &= 1 + \left(2 \frac{sin(\frac {\theta} {2\pi}) + 1}{2} - 1 \right) \delta _ {n} \\ &= 1 + sin(\frac {\theta} {2\pi}) \delta _ {n} \end{align*}" />  
<img src="https://latex.codecogs.com/gif.latex?2&space;\leq&space;n" title="2 \leq n" /> のとき  
<img src="https://latex.codecogs.com/gif.latex?\begin{align*}&space;C&space;_&space;{n}:&space;r&space;&=&space;1&space;&plus;&space;\left(2&space;\frac{cos(2^{n-2}x)&space;&plus;&space;1}{2}&space;-&space;1&space;\right)&space;\delta&space;_&space;{n}&space;\\&space;&=&space;1&space;&plus;&space;cos(2^{n-2}&space;\frac&space;{\theta}&space;{2\pi})&space;\delta&space;_&space;{n}&space;\end{align*}" title="\begin{align*} C _ {n}: r &= 1 + \left(2 \frac{cos(2^{n-2}x) + 1}{2} - 1 \right) \delta _ {n} \\ &= 1 + cos(2^{n-2} \frac {\theta} {2\pi}) \delta _ {n} \end{align*}" />  

になります。まとめると  

<img src="https://latex.codecogs.com/gif.latex?C&space;_&space;{n}:&space;r&space;=&space;\begin{cases}&space;1&space;&plus;&space;sin(\frac&space;{\theta}&space;{2\pi})&space;\delta&space;_&space;{n}&space;&&space;\text{&space;if&space;}&space;n&space;=&space;1&space;\\&space;1&space;&plus;&space;cos(2^{n-2}&space;\frac&space;{\theta}&space;{2\pi})&space;\delta&space;_&space;{n}&&space;\text{&space;if&space;}&space;n&space;\geq&space;2&space;\end{cases}" title="C _ {n}: r = \begin{cases} 1 + sin(\frac {\theta} {2\pi}) \delta _ {n} & \text{ if } n = 1 \\ 1 + cos(2^{n-2} \frac {\theta} {2\pi}) \delta _ {n}& \text{ if } n \geq 2 \end{cases}" />

となるためこの式を利用しています。
うーん…g_n(x) * δ_n がきれいな数字なっていないのでプロットされていない領域がある可能性があります。
