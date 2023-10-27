## **Chi sono**

Lorenzo Belli, sviluppatore front-end specializzato in Angular, condivide la sua esperienza nell'uso di Angular e RxJS per ottimizzare e migliorare il codice durante le attività di bug fixing. La guida è stata anche resa possibile con l'aiuto di strumenti come ChatGPT.

## **Link utili** 
Notion AI (usato per creare documentazione): https://scientific-cicada-9b7.notion.site/Angular-e-RxJS-Un-Approccio-alla-Programmazione-Reattiva-c37f42e355e8444f80a4e7e2f531d56f?pvs=4
Google Drive con PDF scaricabili documentazione: https://drive.google.com/drive/folders/1tH-5iYFIIU_20gCBYxuRecykSpU19dob?usp=drive_link

## **Obiettivi**

1. Approfondire la conoscenza della programmazione reattiva e di RxJS.
2. Identificare e correggere l'utilizzo improprio di RxJS.
3. Presentare le potenzialità di RxJS come una libreria semplice, ma potente.

## **Perché Angular e RxJS?**

- Ottimizzazione delle chiamate HTTP e del loro ordine.
- Miglioramento della leggibilità e manutenibilità del codice.
- Aumento delle prestazioni generali dell'applicazione.

## **Concetti Fondamentali**

### **RxJS e Angular**

RxJS, o Reactive Extensions for JavaScript, facilita la gestione di flussi di dati asincroni e eventi. Angular è un framework front-end che integra nativamente RxJS, creando una sinergia unica tra le due tecnologie.

### **Programmazione Imperativa vs Programmazione Reattiva**

- **Programmazione Imperativa**: Focalizzata sul "come" ottenere un risultato; istruzioni dettagliate e sequenziali.
- **Programmazione Reattiva**: Focalizzata sul "cosa" si desidera ottenere; lascia al sistema la responsabilità di decidere il "come".

### **Observable e Observer**

- **Observable**: Un flusso di dati o eventi che può essere ascoltato.
- **Observer**: Ascolta l'Observable attraverso metodi come **`next`**, **`error`**, e **`complete`**.

```tsx
const myObservable = new Observable(subscriber => {
  subscriber.next(1);
  subscriber.next(2);
  subscriber.complete();
});

myObservable.subscribe(
  value => console.log(`next: ${value}`),
  err => console.log(`error: ${err}`),
  () => console.log('completed')
);
```

### **Subscribe e Unsubscribe**

- **`.subscribe()`**: Per iniziare ad ascoltare un Observable.
- **`.unsubscribe()`**: Per annullare una sottoscrizione, evitando così perdite di memoria.

### **Operatori in RxJS**

- **Operatori di Creazione**: **`of`**, **`from`**, **`interval`**.
- **Operatori Pipeable**: **`map`**, **`filter`**, **`switchMap`**.

### **Debugging**

- **`tap`**: Utile per effetti collaterali come il logging, senza disturbare il flusso di dati.

## **Conclusione**

Questa guida offre una panoramica iniziale di come Angular e RxJS possono essere utilizzati in tandem per migliorare l'efficienza e la qualità del codice. Verranno presentati ulteriori dettagli e esempi specifici in seguito.

---

# **Operatori RxJS Essenziali**

## **Introduzione**

Questa guida è progettata per introdurre alcuni degli operatori più utili e versatili disponibili in RxJS: **`map`**, **`forkJoin`** e **`switchMap`**. Ogni operatore viene esaminato in dettaglio, con esempi pratici e considerazioni sulle performance.

## **Operatore `map`**

### **Cosa fa?**

L'operatore **`map`** in RxJS è utilizzato per trasformare i dati emessi da un Observable. Ad esempio, si potrebbe voler raddoppiare una serie di numeri: utilizzando **`map`**, ogni valore emesso dall'Observable verrà moltiplicato per due, creando un nuovo Observable che emette i valori raddoppiati.

### Esempio

```tsx
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

const source$ = of(1, 2, 3, 4, 5);
const doubled$ = source$.pipe(
  map(value => value * 2)
);

doubled$.subscribe(val => console.log(val));

**//output 2 4 6 8 10**
```

Nell'esempio a sinistra, stiamo utilizzando l'operatore **`of`** per creare un Observable che emette i valori da 1 a 5. Tramite l'operatore **`map`**, stiamo trasformando ogni valore emesso moltiplicandolo per 2. Alla fine, l'Observable **`doubled$`** emetterà i valori 2, 4, 6, 8 e 10.

### **Esempio pratico**

Immaginiamo di fare una chiamata HTTP e di ricevere un oggetto **`User`**. Da questo oggetto potremmo voler estrarre soltanto i campi **`id`** e **`email`**. Usando **`map`**, possiamo trasformare l'Observable di **`User`** in un nuovo Observable che contiene solo i dati necessari.

### **Considerazioni**

- **Immutabilità**: **`map`** genera un nuovo Observable senza modificare l'Observable originale.
- **Efficienza**: Le trasformazioni avvengono in tempo reale, senza attendere che tutti i dati siano disponibili.
- **Contesto**: A differenza della funzione **`map`** degli array, in RxJS si lavora con flussi di dati asincroni.

## Differenze map RxJS e “map” negli Array

L'operatore **map** in RxJS e l'operatore **map** degli array normali hanno un concetto simile, ma vengono utilizzati in contesti diversi.

Similitudini:

- Entrambi gli operatori consentono di trasformare i valori di un insieme di dati.
- Sia in RxJS che negli array normali, è possibile applicare una funzione di trasformazione a ciascun valore per ottenere un nuovo valore corrispondente.

Differenze:

- In RxJS, **map** è un operatore utilizzato per trasformare i valori emessi da un Observable. L'output di **map** è un nuovo Observable con i valori trasformati. Questo permette di lavorare in modo semplice ed efficiente all'interno di uno stream di dati, applicando trasformazioni a ciascun valore emesso.
- Negli array normali, **map** è un metodo disponibile per gli array. Viene utilizzato per trasformare gli elementi di un array, applicando una funzione di trasformazione a ciascun elemento e ottenendo un nuovo array con gli elementi trasformati. Questo consente di lavorare con i dati in modo simile a RxJS, ma senza il concetto di stream di dati emessi nel tempo.

Esempio di utilizzo di **map** in RxJS:

Esempio di utilizzo di **map** negli Array normali:

```tsx
const numbers$ = of(1, 2, 3, 4, 5);

numbers$.pipe(
  map(num => num * 2)
).subscribe(result => console.log(result));

// Output: 2, 4, 6, 8, 10

```

```tsx
const numbers = [1, 2, 3, 4, 5];

const doubledNumbers = numbers.map(num => num * 2);

console.log(doubledNumbers);

// Output: [2, 4, 6, 8, 10]

```

In entrambi gli esempi, viene applicata una funzione di trasformazione (moltiplicazione per 2) a ciascun valore e viene ottenuto un nuovo insieme di valori corrispondenti.

In sintesi, l'operatore **map** in RxJS e il metodo **map** degli array normali condividono il concetto di trasformazione dei valori, ma vengono utilizzati in contesti diversi: RxJS per lavorare con stream di dati emessi nel tempo, mentre gli array normali per lavorare con insiemi di dati statici.

## **Operatore `forkJoin`**

### **Cosa fa?**

**`forkJoin`** è utilizzato quando si hanno multiple operazioni asincrone da eseguire in parallelo e si desidera attendere che tutte siano completate prima di procedere.

### **Esempio pratico**

**`forkJoin`** prende un array di Observable e restituisce un nuovo Observable che emette un array con i risultati di ciascun Observable in ingresso, solo dopo che tutti si sono completati.

```tsx
import { forkJoin, of } from 'rxjs';
import { delay } from 'rxjs/operators';

// Simuliamo 3 chiamate HTTP con ritardi diversi utilizzando `of` e `delay`.
const call1$ = of('Risultato chiamata 1').pipe(delay(1000));  
const call2$ = of('Risultato chiamata 2').pipe(delay(2000));
const call3$ = of('Risultato chiamata 3').pipe(delay(3000));

forkJoin([call1$, call2$, call3$]).subscribe(result => {
  console.log(result);
});

// Output dopo 3 secondi:
// ["Risultato chiamata 1", "Risultato chiamata 2", "Risultato chiamata 3"]
```

### **Vantaggi**

1. **Efficienza**: Esecuzione parallela di chiamate asincrone.
2. **Semplicità**: Gestione automatica dell'attesa per il completamento di tutte le operazioni.
3. **Determinismo**: L'ordine nell'array finale corrisponde all'ordine degli Observable in ingresso.
4. **Componibilità**: Può essere combinato con altri operatori.
5. **Gestione degli errori**: Se uno degli Observable fallisce, **`forkJoin`** fallirà anche lui.

## **Operatore `switchMap`**

### **Cosa fa?**

**`switchMap`** viene utilizzato quando un Observable dipende dai valori emessi da un altro Observable.

### **Esempio pratico**

Supponiamo di avere una chiamata HTTP che restituisce un array di post. Ogni post ha un campo **`id`**. Utilizzando **`switchMap`**, è possibile usare questo **`id`** per effettuare una seconda chiamata HTTP e ottenere una lista di commenti correlati a quel post.

```tsx
import { switchMap } from 'rxjs/operators';

data: Comment[];

// Simuliamo una selezione di un ID.
constructor(http: HttpClient) {
    http.get<Array<Post>>('https://jsonplaceholder.typicode.com/posts/')
      .pipe(
        switchMap(posts => http.get<Array<Comment>>('https://jsonplaceholder.typicode.com/comments/?postId=' + posts[1].id))
      )
       .subscribe(
          res => {
            console.log(res)
          }
        )
  } //output -> elenco di commenti legati ai post
```

### **Esempio con Iterazione sugli Array**

Un altro caso d'uso interessante di **`switchMap`** è la possibilità di iterare su un array di elementi e applicare ulteriori trasformazioni o operazioni su ogni elemento. Prendiamo come esempio la seguente chiamata HTTP, che restituisce un array di oggetti **`User`**:

```tsx
http.get<User[]>('https://jsonplaceholder.typicode.com/users')
  .pipe(
    switchMap(users => users),
    map(user => user.email),
    toArray()
  )
  .subscribe( res => {
    console.log('res:', res);
	}
  );

// Output console ["alice@example.com", "bob@example.com", "charlie@example.com"]
```

Nell'esempio, il metodo **`http.get`** restituisce un Observable che emette un array di oggetti **`User`**. Utilizziamo l'operatore **`switchMap`** per "aprire" questo array e ottenere un nuovo Observable per ciascun elemento del array.

Il funzionamento qui è un po' diverso dal caso d'uso precedente: **`switchMap`** riceve un array come input e lo "smonta", emettendo un nuovo Observable per ciascun elemento del array. Questi nuovi Observable sono poi processati dagli operatori successivi nella catena **`pipe`**.

L'operatore **`map`** viene utilizzato successivamente per estrarre solamente la proprietà **`email`** da ogni oggetto **`User`**. Alla fine, l'operatore **`toArray`** raccoglie tutti i valori trasformati in un singolo array che viene emesso.

Il risultato finale è un array di indirizzi email che viene assegnato alla variabile **`this.output`** all'interno del metodo **`subscribe`**.

Questo esempio mostra come **`switchMap`** possa essere utilizzato non solo per gestire dipendenze tra Observable, ma anche per iterare su collezioni di dati, consentendo ulteriori trasformazioni o operazioni su ciascun elemento.

### **Considerazioni Importanti**

Una delle principali differenze tra **`switchMap`** e altri operatori di mapping come **`map`** o **`mergeMap`** è che **`switchMap`** annulla la sottoscrizione all'Observable precedente ogni volta che ne viene generato uno nuovo. Questo comportamento è particolarmente utile per evitare effetti indesiderati come chiamate HTTP multiple o sottoscrizioni multiple quando si desidera che solo l'ultimo valore emesso sia considerato.

## **Conclusione**

Operatori come **`map`**, **`forkJoin`** e **`switchMap`** sono strumenti potenti in RxJS per gestire flussi di dati asincroni in modo efficiente e componibile. Ognuno ha le sue specifiche utilità e contesti in cui risulta particolarmente efficace.

---

# **Uso di Operatori RxJS in Angular: Un Esempio con `methodWithRxjsOperators()`**

## **Panoramica**

Questa guida si concentra sul metodo **`methodWithRxjsOperators()`**, che serve come esempio per dimostrare come gestire diverse chiamate API e manipolare i dati ricevuti in modo reattivo utilizzando RxJS.

## **Impostazione Iniziale**

### **Attivazione dell'Indicatore di Caricamento**

Prima di tutto, impostare la variabile **`this.isLoading`** a **`true`**. Questo flag è utile per mostrare un indicatore di caricamento nell'interfaccia utente.

```tsx
this.isLoading = true;
```

## **Sottoscrizione al Flusso di Dati**

### **Abbonarsi a `this.postDetails$`**

Sottoscriviti al flusso dati **`this.postDetails$`** come segue:

```tsx
this.subscription = this.postDetails$;
```

## **Utilizzo degli Operatori**

### **Uso dello switchMap**

Applica l'operatore **`switchMap`** per manipolare i post ricevuti dal flusso. Questo operatore consente di effettuare ulteriori chiamate API per recuperare dettagli sull'utente e i commenti associati a ciascun post.

```tsx
.pipe(
  switchMap(post => {
    // ...
  })
)
```

### **Uso del forkJoin**

Dentro il blocco **`switchMap`**, utilizza l'operatore **`forkJoin`** per effettuare chiamate API multiple in parallelo. Ad esempio, per ottenere i dettagli dell'utente e i commenti associati a un post specifico:

```tsx
return forkJoin({
  user: this.httpClient.get<User>(`${this.userUri}/${post.userId}`),
  comments: this.httpClient.get<Comments[]>(`${this.postsUri}/${post.id}/comments`)
});
```

### **Uso di map e catchError**

Dopo aver ottenuto i dati, utilizza l'operatore **`map`** per formattare i dati secondo le tue necessità. In caso di errore, l'operatore **`catchError`** permette di gestire le eccezioni.

```tsx
.pipe(
  map(details => {
    return {post, user: details.user, comments: details.comments,}
  }),
  catchError(error => {
    this.hasError$.next(true);
    return of(null);
  })
)
```

### **Uso del finalize**

L'operatore **`finalize`** è utile per eseguire operazioni di pulizia o per aggiornare lo stato del componente, come impostare **`this.isLoading`** a **`false`**, a prescindere dall'esito della chiamata.

```tsx
finalize(() => this.isLoading = false
```

## **Assegnazione Finale dei Dati**

Alla fine, la sottoscrizione al flusso dati ti permetterà di assegnare i dettagli completi alle variabili d'istanza del componente Angular.

```tsx
.subscribe(completeDetails => {
  if (completeDetails) {
    this.post = completeDetails.post;
    this.user = completeDetails.user;
    this.comments = completeDetails.comments;
  }
});
```

## **Conclusioni**

Con questo metodo, è possibile gestire operazioni complesse in un modo più strutturato e leggibile grazie all'uso combinato degli operatori RxJS **`switchMap`**, **`forkJoin`**, **`map`**, **`catchError`** e **`finalize`**. Questi operatori offrono un controllo dettagliato sul flusso di dati e permettono di gestire vari scenari in modo efficiente.

# **Sinergia tra RxJS e Lifecycle Hooks di Angular**

## **Introduzione**

La combinazione di RxJS con i lifecycle hooks di Angular è potentissima e offre vantaggi significativi nello sviluppo di applicazioni. Questa guida esplora come queste due tecnologie lavorano insieme per rendere le applicazioni più pulite, manutenibili e performanti.

## **Gestione dello Stato**

### **RxJS per lo Stato Reattivo**

RxJS è un eccellente strumento per la gestione dello stato dell'applicazione in un modo reattivo. Permette di manipolare e controllare il flusso dei dati con grande precisione.

### **Lifecycle Hooks di Angular**

I lifecycle hooks di Angular offrono punti di aggancio in diverse fasi del ciclo di vita di un componente. Questi possono essere utilizzati per interagire con lo stato dell'applicazione in modo molto specifico.

## **Controllo del Flusso dei Dati**

### **Strumenti Potenti in RxJS**

RxJS offre un controllo fine-grained sul flusso dei dati. È possibile manipolare, filtrare, trasformare e combinare diversi flussi di dati con facilità.

### **Lifecycle Hooks come Punti di Controllo**

Utilizzando i lifecycle hooks di Angular, è possibile attivare o disattivare questi flussi di dati nelle fasi del ciclo di vita in cui sono più necessari.

## **Prevenzione di Memory Leaks**

### **Utilizzo di `ngOnDestroy` e `takeUntil`**

Un grande vantaggio è la prevenzione di memory leaks. Combinando l'hook **`ngOnDestroy`** con l'operatore RxJS **`takeUntil`**, si può garantire che tutte le risorse siano liberate correttamente quando un componente viene distrutto.

## **Modularità e Componibilità**

### **Blocchi di Codice Riutilizzabili**

Sia RxJS che Angular sono modulabili e componibili. Questo favorisce la creazione di blocchi di codice altamente riutilizzabili, che possono essere facilmente testati e mantenuti.

## **Conclusioni**

### **Sinergia Perfetta**

La sinergia tra RxJS e i lifecycle hooks di Angular è molto efficace. Mentre RxJS fornisce gli strumenti per la gestione reattiva dei dati, Angular offre i meccanismi per controllare quando e come questi dati dovrebbero essere manipolati, creati o distrutti.

### **Temi Avanzati**

Al di là degli aspetti fondamentali, esistono temi avanzati come l'uso della pipe **`Async`**, i **`Subjects`** e la gestione avanzata degli errori, che meritano un'indagine più dettagliata per sfruttare appieno la potenza di queste tecnologie.

Utilizzando queste due tecnologie insieme, non solo lo sviluppo di applicazioni diventa più efficiente, ma anche più intuitivo e manutenibile.
