# lab2learn Machine Learning

# Weka Lab
*02/04/2019*

The following lab uses a desktop version of the [Weka](https://www.cs.waikato.ac.nz/ml/index.html) (Waikato Environment for Knowledge Analysis) System, which you can download [here](https://www.cs.waikato.ac.nz/ml/index.html).

We have used the version 3.8.3.

## Weka for Linux

Download the [Weka 3.8.3](http://prdownloads.sourceforge.net/weka/weka-3-8-3.zip) and unzip. Open a terminal in the unziped directory and run the environment using the following command line:
~~~
java -jar weka.jar
~~~

# Supervised Learning

## UCI Heart Disease Data Set

Original [Heart Disease Data Set](https://archive.ics.uci.edu/ml/datasets/heart+Disease) at UCI Machine Learning Repository.

Adapted data set (from: `http://staffwww.itn.liu.se/~aidvi/courses/06/dm/labs/`) to run over Weka is in the folder: `uciml`, names `heart-c.arff` (Weka file) and `heart-c-comments.arff' (Weka descriptive file).

## (Portuguese) Conhecendo o problema do Zombie Health

### Jogando o jogo Zombie Health

![Zombie Health](zombie-health/s00resources/zombie-health.png)

No jogo a seguir você deve diagnosticar zumbis a partir de seus sintomas e tratá-los. Se você errar o zumbi morre. Tente esboçar um diagrama ligando sintomas a doenças, que permita você diagnosticar essas doenças de forma eficiente.

Jogue o jogo: [Zombie Health](http://santanche.github.io/java2learn/notebooks/pt/c03oo-zombie/s02datasource/s01jogo/index.html)

## Matriz de sintomas e doenças

Veja como os sintomas e as doenças podem ser representados na forma de uma matriz (a associação entre sintomas e doenças é diferente daquela do jogo).

* [Matriz de sintomas e doenças em português](zombie-health/s00resources/zombie-health-challenge-pt.pdf)

Agora veja a mesma matriz em inglês que será usada no programa a ser feito. Você é capaz de adaptar o seu diagrama para lidar com essa matriz?

* [Matriz de sintomas e doenças em inglês](zombie-health/s00resources/zombie-health-challenge-en.pdf)

## Zombie Health no Weka

Entre na pasta `zombie-health/s02weka` e, a partir do arquivo `zombie-health-spreadsheet-ml.arff` treine o Weka para classificar doenças a partir de sintomas.

# Unsupervised Learning

[Iris Flower Data Set](https://archive.ics.uci.edu/ml/datasets/iris). It comes with Weka (see in Weka `data` directory, the file `iris.arff`).

Challenge: How to classify three very similar species of plant according to four characteristics of their flowers:
* Sepal Length
* Sepal Width
* Petal Length
* Petal Width

# Regras de Associação
*Lab de Componentização e Reúso de Software 01/08/2020*

Estude o exemplo construído Orange no diretório:
* [zombie-health/s03orange/](zombie-health/s03orange/)

Especificamente o arquivo `zombie-health-ml-association.ows` que carrega o arquivo `zombie-health-association.csv` (pode ser necessário reconfigurar o caminho de entrada do arquivo no Orange).

Este exemplo descobre regras de associação entre sintomas e doenças.

## Tarefa

Acesse o diretório [foodmart/](foodmart/) que relaciona compras realizadas por clientes sobre produtos e descubra regras de associação entre produtos. Como estes dados poderiam ser explorados para recomendar produtos para clientes?