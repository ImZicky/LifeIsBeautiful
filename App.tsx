import { useEffect, useState } from 'react';
import { ImageBackground, StyleSheet, View, Image, Modal, ScrollView } from 'react-native';
import { load } from 'cheerio';
import { Button, Text } from '@react-native-material/core';
import { Audio } from 'expo-av';
import * as Haptics from 'expo-haptics';
import { useFonts } from "expo-font";
import * as Clipboard from 'expo-clipboard';

export type Theme = {
  title: string,
  value: string
}

export default function App() {
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#780707',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 15,
    },
    titleText: {
      textAlign: 'center', 
      fontSize: 50, 
      fontFamily: "LoveLight", 
    },
    subtitleText: {
      textAlign: 'center', 
      fontSize: 20, 
      fontFamily: "LoveYaLikeASister", 
    },
    quoteText: {
      marginTop: 10,
      textAlign: 'center', 
      fontSize: 23, 
      fontFamily: "LovedByTheKing", 
      letterSpacing: -1
    },
    quoteAuthor: {
      marginTop: 20,
      textAlign: 'left', 
      fontSize: 23, 
      fontFamily: "LoveYaLikeASister", 
    },
    infoText: {
      marginTop: 20,
      textAlign: 'center', 
      fontSize: 15, 
      fontFamily: "LoveYaLikeASister", 
    },
    subtitleText2: {
      marginTop: 30,
      textAlign: 'left', 
      fontSize: 20, 
      fontFamily: "LoveYaLikeASister", 
    },
    btnInitial: {
      width: "100%",
      paddingLeft: 10,
      paddingRight: 10,
      marginTop: 5,
      backgroundColor: "#b30006",
      borderColor: '#fff',
      borderStyle: 'dashed',
      borderWidth: 1
    },
    btnSurprise: {
      width: "100%",
      paddingLeft: 10,
      paddingRight: 10,
      marginTop: 10,
      backgroundColor: "#e6ab09",
      borderColor: '#b30006',
      borderStyle: 'dashed',
      borderWidth: 1
    },
    btnAfter: {
      width: "100%",
      paddingLeft: 10,
      paddingRight: 10,
      marginTop: 10,
      backgroundColor: "#a30b0b",
      borderColor: '#b30006',
      textDecorationColor:"#780707",
      color: "#780707", 
      tintColor: "#780707",
      borderStyle: 'dashed',
      borderWidth: 3
    },
    centeredViewModal: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
    },
    modalViewModal: {
      margin: 10,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 35,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
  });

  const [brickerQuotes] = useState<string[]>(['Se você fosse um fogão eu beijava todas as suas bocas.','Quando você for casar, me convida para ser o noivo?','Você não é cardiologista mas mexe com meu coração.', 'Queria tomar um sorvete mas o sabor que eu quero só tem na sua boca.','Me chama de Estados Unidos e me USA.','Linda, tu não é uma estrada com muitos buracos, entretanto você é um pedaço de mau caminho','Moça, você não é a tampinha de uma caneta, Contudo me dá vontade de te morder','Linda, pare agora de brincar de esconde-esconde, E Bora logo pro pega-pega.','Moça, eu não sou nenhum quebra cabeça, Entretanto eu me encaixo direitinho em você!','Você é igual meu cartão de crédito, fico torcendo pra você passar.','Você é doceira? Queria encomendar uns beijinhos.','Me chama de previsão do tempo e diz que tá rolando um clima.','Me chama de exame de vista e diz que eu sou seu foco.','Me chama de órgãos vitais e diz que sem mim você não vive.','Me chama de sedex 10 que eu me entrego pra você até as 9 da manhã do dia seguinte.','E aí gata, tá faltando o quê para a gente ficar? Uma atitude minha ou um sorriso seu?','Não entendi o que você falou só concordei porque quero ficar com você.','Gata, me dê seu currículo porque hoje vou te dar trabalho.','Gata eu sei que as coisas estão difíceis para você, mas eu não.','Cantadas de pedreiro pesadas','Gata, me chame de Tarzan e segure no meu cipó.','Me chame de juiz que hoje estou querendo resolver nosso caso na vara.','Você gosta de estrelas?  Sim, por quê? Porque conheço um lugar que tem cinco.','Gata, me chame de capeta e deixe eu te possuir.','Você tem uma colher aí? Por quê?  Porque eu estou dando sopa.','Gata, fiquei sabendo que o bife não gosta de você.','Queria ser mecânico para botar a mão na sua máquina.','Eu sou religioso e acredite você é a resposta das minhas orações','Acredito que sua lista de tarefas está bem cheia hj, mas você pode achar um espacinho na sua lista de tarefas e me adicionar.','Sou doador de órgão, mas para você quero doar o meu coração.','Oi?  É que ouvi dizer que o bife é contra filé.','Seu pai é um agricultor?  Não, por quê?  Porque você é um xuxuzinho.','Você não imagina o quanto te quero, ao seu lado sou feliz, porque por você quero me apaixonar','Não importa o que fizermos, somente quero estar ao seu lado, porque nos teus braços todos os momentos são especiais.','Gata, meu nome é Arnaldo, mas pode me chamar de Naldo, pois quando eu te vi perdi o ar.','Me chame de receita federal e se declare para mim, sua linda!','Gata, você tem a cara da minha terceira namorada e olha que eu só tive duas.','Gata, quando você for casar me convida para ser o noivo.','Linda! vamos parar  de brincar de esconde-esconde, E vamos direto para o pega-pega.','Linda, não sou Alice, Mas ao seu lado me sinto no País das Maravilhas.','Você vai ficar comigo, ou eu tenho que mentir para o meu diário de novo?','Eu não posso provar meus lábios, você poderia fazer isso por mim?!?!','Não sou casas Bahia mas minha dedicação é total a você…','Gata sei que as coisas estão muito difíceis para você, mas eu to facilzinho sua linda','Gata, me chama de wi-fi e fica perto de mim para nos fazermos uma boa conexão.','Ei gata, você não é o google mas tem tudo que eu procuro em uma mulher','Gata, não sou o Jota Quest, mas tô fácil, extremamente fácil pra você.','Gata não sou Botijão, mas vem que eu to cheio de gás”.','Você está esperando o ônibus? – Não, porque? – Porque você está no ponto.','Vou te dar um abraço. Se você não gostar, me devolve!','Se você segurar 8 rosas na frente de um espelho, verá 9 das coisas mais bonitas do mundo!','Onde é que eu deixo meu currículo para concorrer à vaga de amor da sua vida?','Tudo em você é perfeito menos uma coisa você ainda não é minha namorada, então vamos começar','Gata! Meus olhos choram por te ver, meus braços para te abraçar, meus lábios para te dar um sorriso, meu coração para te amar.','Me chama de passaporte que eu te faço viajar.','Você é o prego que falta na minha havaianas.','Você não é GPS quebrado mas me deixa sem rumo.','Vai pegar o ônibus? Porque você está no ponto certo.','Aqui você tem a chave, quando quiser podes abrir meu coração.','Agora que te conheço, não tenho nada mais que desejar.', 'As rosas são vermelhas, violetas são azuis, eu não posso rimar, mas posso namorar com você?', 'Se você está aqui, quem está gerenciando o céu?', 'Gata seu pai e pirata? Então porque ele esconde um tesouro desse em casa.', 'Enquanto me mexo na cama, a única coisa em que posso pensar é em todas as travessuras que fizemos ontem. Tenho saudades tuas, querida!', 'O sol pode ser o mais brilhante, mas nada pode ser comparado com a luz que você trouxe para a minha vida. Você é a pessoa mais preciosa da minha vida.', 'É a melhor sensação do mundo quando você me envia uma mensagem de texto, mesmo que seja para cumprimentar, porque mesmo que seja por uma fração de segundo, eu sei que estou em seus pensamentos.', 'Você é todo o meu mundo.', 'Você é a razão pela qual minha vida é mais brilhante, mais feliz e mais louca.', 'Não estou flertando contigo. Eu só tento te deixar com tesão.', 'Parabéns, você acabou de ganhar um prêmio por roubar meu coração. E o seu prémio espera-o esta noite no nosso quarto.', 'Você sabe que o corpo humano é composto por 70% de água? Sinto-me muito sedento neste momento.'])
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [quote, setQuote] = useState<string | undefined>();
  const [quoteAuthor, setQuoteAuthor] = useState<string | undefined>();
  const [loadingRandIndex, setLoadingRandIndex] = useState<number>(1);
  const [chosenTheme, setChosenTheme] = useState<string | undefined>();
  const [didLoad, setDidLoad] = useState<boolean>(false);
  const [openSurpriseModal, setOpenSurpriseModal] = useState<boolean>(false);

  const [themes] = useState<Theme[]>([
    {value: 'frases_curta_sobre_amar', title: 'Apenas Amada?'},
    {value: 'poemas_romanticos', title: 'poeticamente amada?'},
    {value: 'frases_sobre_felicidade', title: 'Bem Feliz?'},
    {value: 'frases_de_reflexao', title: 'Um pouco Reflexiva?'},
    {value: 'frases_de_otimismo', title: 'bastante otimista?'},
    {value: 'cantadas_de_pedreiro', title: 'ou... cantada por um pedreiro?'},
  ]);

  const [greetings] = useState<string[]>([
    'Olá, Luana',
    'Oi Luanita!',
    'Hola Luana',
    'Hola Luna!',
    'Oi Lua!!'
  ])

  const [chosenGreetingIndex, setChosenGreetingIndex] = useState<number>(0);

  const getQuote = async () => {
    setIsLoading(true);
    if(chosenTheme === 'cantadas_de_pedreiro') {
      const randomPage = parseInt(`${Math.random() * brickerQuotes.length}`);
      setQuote(brickerQuotes[randomPage]);
      setQuoteAuthor(undefined);
    }
    else{
      const randomPage = parseInt(`${Math.random() * 50}`);
      const searchUrl = `https://www.pensador.com/${chosenTheme}/${randomPage}`;
      const response = await fetch(searchUrl);    
      const htmlString = await response.text();
      if(htmlString){
        let $ = load(htmlString);        
        const quotes = $(".thought-card");        
        const randomQuoteIndex = parseInt(`${Math.random() * quotes.length}`)
        if(quotes[randomQuoteIndex]){
          $ = load(quotes[randomQuoteIndex]);          
          const chosenQuoteText = $(".frase").text();
          const chosenQuoteAuthor = $(".autor").text();
          setQuote(chosenQuoteText);
          setQuoteAuthor(chosenQuoteAuthor);  
        }
      }
    }
    setIsLoading(false);
  }

  const handleBack = () => {
    playSoundSelectButton()
    setChosenTheme(undefined);
    setLoadingRandIndex(parseInt(`${Math.random() * 6}`))
  }

  const handleGetMoreQuotes = () => {
    setLoadingRandIndex(parseInt(`${Math.random() * 6}`))
    getQuote();
    playSoundSelectButton()
  }

  useEffect(() => {
    setIsLoading(true);
    if(!didLoad) {
      playSoundDefault();
      setDidLoad(true);
    }
    setChosenGreetingIndex(parseInt(`${Math.random() * greetings.length}`));
    getQuote();
  }, [chosenTheme])


  const [soundDefault, setSoundDefault] = useState<any>();

  const playSoundDefault = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require('./assets/Perfect.mp3'));
      sound.setVolumeAsync(0.1);
      sound.setIsLoopingAsync(true);
      setSoundDefault(sound);
      await sound.playAsync();
  }

  useEffect(() => {
    return soundDefault
    ? () => {
      soundDefault.unloadAsync();
    }
    : undefined;
  }, [soundDefault]);


  const [soundSelectButton, setSoundSelectButton] = useState<any>();
  const playSoundSelectButton = async () => {
    const { sound } = await Audio.Sound.createAsync(require('./assets/select.mp3'));
    setSoundSelectButton(sound);
    sound.setVolumeAsync(1);

    Haptics.notificationAsync(
      Haptics.NotificationFeedbackType.Warning
    );
    await sound.playAsync();
  }

  useEffect(() => {
    return soundSelectButton
    ? () => {
      soundSelectButton.unloadAsync();
    }
    : undefined;
  }, [soundSelectButton]);

  const [soundCook, setSoundCook] = useState<any>();
  const playSoundCook = async () => {
    const { sound } = await Audio.Sound.createAsync(require('./assets/cook.mp3'));
    setSoundCook(sound);
    sound.setVolumeAsync(1);

    Haptics.notificationAsync(
      Haptics.NotificationFeedbackType.Success
    );
    await sound.playAsync();
  }

  useEffect(() => {
    return soundCook
    ? () => {
      soundCook.unloadAsync();
    }
    : undefined;
  }, [soundCook]);

  const [soundGetItem, setSoundGetItem] = useState<any>();
  const playSoundGetItem = async () => {
    const { sound } = await Audio.Sound.createAsync(require('./assets/item-get.mp3'));
    setSoundGetItem(sound);
    sound.setVolumeAsync(1);

    Haptics.notificationAsync(
      Haptics.NotificationFeedbackType.Success
    );
    await sound.playAsync();
  }

  useEffect(() => {
    return soundGetItem
    ? () => {
      soundGetItem.unloadAsync();
    }
    : undefined;
  }, [soundGetItem]);

  const handleChooseTheme = (value: string) => {
    setChosenTheme(value);
    playSoundSelectButton()  
  }

  const handleCopyCode = async () => {
    await Clipboard.setStringAsync('CÓDIGO DO IFOOD AQUI');
    playSoundCook();
  }

  //Fonts
  const [loaded] = useFonts({
    LovedByTheKing: require("./assets/fonts/LovedbytheKing-Regular.ttf"),
    LoveLight: require("./assets/fonts/LoveLight-Regular.ttf"),
    LoveYaLikeASister: require("./assets/fonts/LoveYaLikeASister-Regular.ttf"),
  });

  return (
    <>
      { loaded && (
        <ImageBackground style={styles.container} source={require(`./assets/background.gif`)}>
          <View>
            {chosenTheme ? (
              <>
              { !isLoading ? (
                <View style={{backgroundColor: "#780707", borderRadius: 20, padding: 10, margin: 10, paddingHorizontal: 30, paddingVertical: 20, borderColor: "#fff", borderStyle: 'dotted', borderWidth: 2 }}>
                  {
                    chosenTheme === 'cantadas_de_pedreiro' && 
                    <Image style={{width: 300, height: 300}} source={require(`./assets/bricker.gif`)}/>  
                  }
                  <ScrollView style={{maxHeight: 500}}>
                    <Text color='#fff' style={styles.quoteText}>{quote}</Text>
                    <Text color='#fff' style={styles.quoteAuthor}>{quoteAuthor}</Text>
                    <Button style={styles.btnAfter} title='pulsar o coração' onPress={() => handleGetMoreQuotes()} />
                    <Button style={styles.btnAfter} title='VOLTAR' onPress={() => handleBack()} />
                  </ScrollView>
                </View>
              ) : (
                <View style={{backgroundColor: "#780707", borderRadius: 20, padding: 10, margin: 10, paddingHorizontal: 10, paddingVertical: 10, borderColor: "#fff", borderStyle: 'dotted', borderWidth: 2 }}>
                  <Image style={{width: 300, height: 300, borderRadius: 20}} source={
                    loadingRandIndex === 1 ? require(`./assets/loading-1.gif`):
                    loadingRandIndex === 2 ? require(`./assets/loading-2.gif`):
                    loadingRandIndex === 3 ? require(`./assets/loading-3.gif`):
                    loadingRandIndex === 4 ? require(`./assets/loading-4.gif`):
                    loadingRandIndex === 5 ? require(`./assets/loading-5.gif`):
                    require(`./assets/loading-6.gif`)
                  }/> 
                  <Text color='#fff'  style={styles.infoText}>Carregando...</Text>
                </View>
              )
            }
              </>
            ) : (
              <View>
                  <View style={{backgroundColor: "#c70202", borderRadius: 20, padding: 10, marginBottom: 10 }}>
                    <Text color='#fff' style={styles.titleText}>{greetings[chosenGreetingIndex]}</Text>
                  </View>
                  <View style={{borderRadius: 20, padding: 10 }}>
                    <Text color='#fff' style={styles.subtitleText}>Como posso te fazer se sentir melhor hoje?</Text>
                    <Text color='#fff' style={styles.subtitleText2} variant="body1">Quer se sentir...</Text>
                  </View>
                  {themes.map((x, i) => (
                    <Button key={`${x}_${i}`}  style={styles.btnInitial} title={x.title} onPress={() => handleChooseTheme(x.value)} />
                  ))
                }
                <Button style={styles.btnSurprise} key={`surprise`} title={"SURPRESA"} onPress={() => {
                  playSoundGetItem(); 
                  setOpenSurpriseModal(true)
                }} />
              </View>
            )
          }
          </View>
        </ImageBackground>
      )
      }
      <Modal
        animationType="slide"
        transparent
        visible={openSurpriseModal}
        onRequestClose={() => {
          setOpenSurpriseModal(false);
        }}
      >
        <View style={styles.centeredViewModal}>
          <View style={styles.modalViewModal}>
            <Text color='#b30006' style={styles.subtitleText}>PRESENTE!!!</Text>
            <Image style={{width: 300, height: 200, marginTop: 20}} source={require(`./assets/cartao-ifood.png`)}/>
            <Text color='#b30006' style={styles.subtitleText}>VAI DAR PRA COMPRAR MUITA BATATA kkkkkk</Text>
            <View style={{width: 300}}>
              <Button style={styles.btnAfter} title='copiar código' onPress={() => handleCopyCode()} />
              <Button style={[styles.btnInitial, {marginTop: 30}]} title='VOLTAR' onPress={() => setOpenSurpriseModal(false)} />
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

