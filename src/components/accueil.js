import React, { useState, useEffect, useRef } from 'react'
import firebaseDb from "../firebase";
import './test.css'
import { Link } from 'react-router-dom'
import Card from './Cards/CardsIU'
import "mdbreact/dist/css/mdb.css";
import { useLocation } from "react-router-dom";
import { VscSearch } from "react-icons/vsc";
import { HiTranslate, HiClock, HiViewGridAdd, HiOutlineViewList } from "react-icons/hi";
import axios from 'axios';
import { useAuth } from "../components/Authentification/AuthContext"

const Accueil = () => {
  const location = useLocation();
   const d = new Intl.DateTimeFormat('fr-GB', { dateStyle: 'full', timeStyle: 'long' }).format(firebaseDb.firestore.Timestamp.now().toDate());
  var tabg = [];
  var  sp;
  var datenow;
  let formtag = [];
  var tabfiltre = [];
  var filtreformation = [];
  const linkstyle = {
    color: 'black',
  }
  const { currentUser } = useAuth()
  const [userid, setuserid] = useState(currentUser.uid)

  const [showpost, setshowpost] = useState(true)
  const [formations, setformations] = useState([]);
  const [Emplois, setEmplois] = useState([]);
  const [listperferences, setlistperferences] = useState([]);
  var p;
  var p1;
  var i;
  var pos;
  const ListTags = [
    'Artificial Intelligence',
    'design',
    'Formation',
    'training',
    'technical',
    "marketing",
    'reporting',
    'research',
    'analytics',
    'engineering',
    'finance',
    'project management',
    'health',
    'customer service',
    'safety',
    "certification",
    'legal',
    'database',
    'coaching',
    'logistics',
    'mobile',
    'C (programming language)',
    'human resources',
    "recruitment",
    'management experience',
    'programming',
    'agile',
    'business development',
    'audit',
    'architecture',
    'governance',
    'continuous improvement',
    'product development',
    'networking',
    'CRM',
    'computer science',
    'SQL',
    'video',
    'installation',
    'data analysis',
    'statistics',
    'coding',
    'Microsoft Office',
    'frameworks',
    'BI',
    'HTML',
    'internship',
    'Stage',
    'software development',
    'oracle',
    'Alien',
    'Java',
    'teaching',
    'ERP',
    'Javascript',
    'Tdigital marketing',
    'Linux',
    'SaaS',
    'mathematics',
    'project management skills',
    'mechanical engineering',
    'android',
    'Adobe',
    'ISO',
    'C++',
    'scrum',
    'e-commerce',
    'user experience',
    'Python',
    'technical skills',
    'electrical engineering',
    'Microsoft Word',
    'C#',
    'UX',
    'physics',
    'leadership development',
    'AWS',
    'UI',
    'front-end',
    '.NET',
    'MATLAB',
    'API',
    'photography',
    'internal communications',
    'chemicals',
    'OS',
    'ETL',
    'telecom',
    'research projects',
    'big data',
    'VMware',
    "statistical analysis",
    'SolidWorks',
    'datasets',
    'Unix',
    'information system',
    'SQL server',
    'machine learning',
    'DNS',
  ];

  useEffect(() => {
    var tab1 = [];
    const listepreferences = () => {
      firebaseDb.firestore()
        .collection("User")
        .doc(userid)
        .get().then((snap) => {
          if(snap.data() != undefined){
          setlistperferences(snap.data().Preferences);
          }

        })

    }

    //import NavBar from "../headers/nav";


    const fetchData = async () => {
      firebaseDb.firestore()
        .collection("OffresEmploi")
        .get()
        .then(snapshot => {

          if (snapshot.empty) {
            //console.log("empty snap")
            setEmplois({
            })
          } else {
            // console.log(snapshot)
            var dat;
            snapshot.forEach(doc => {
              dat = { ...doc.data(), id: doc.id };
              tab1 = [
                ...tab1,
                dat,
              ]

            });

            setformations(
              {
                ...formations,
                tab1: tab1,

              }
            )

          }

        }).catch(error => console.log(error));
    }
    const fetchDataFormations = async () => {
      firebaseDb.firestore()
        .collection("Formations")
        .get()
        .then(querySnapshot => {

          if (querySnapshot.empty) {
            //console.log("empty")
            setformations({
            })
          } else {
            var dat1;
            querySnapshot.forEach(doc => {
              dat1 = { ...doc.data(), id: doc.id };
              tab1 = [
                ...tab1,
                dat1,

              ]


            });
            setformations(
              {
                ...formations,
                tab1: tab1
              }
            )
          }

        }).catch(error => console.log(error))
    }

    fetchData();
    fetchDataFormations();
    listepreferences();
  }, [], [], []);

  useEffect(() => {
    window.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  });

  const handleClickOutside = event => {
    const { current: wrap } = wrapperRef;
    if (wrap && !wrap.contains(event.target)) {
      setDisplay(false);
    }
  };

  const [display, setDisplay] = useState(false);
  const searchWrapper = document.querySelector('.wrapper');
  const [Options, setOptions] = useState([]);
  const [search, setSearch] = useState("");
  const wrapperRef = useRef(null);

  const addEventListener = (keyup) => {
    let results = [];
    if (keyup.length) {
      results = ListTags.filter((item) => {
        return item.toLowerCase().includes(keyup.toLowerCase());
      });
      setDisplay(false)
    } else {
      setDisplay(false)

    }

    renderResults(results);
  }
  const addOrEditemploi = opt => {
    if (opt != "") {
      firebaseDb.firestore().collection('User').doc(userid).get().then((d) => {
        var P = d.data().Preferences;
        if (!P.includes(opt)) {
          P.unshift(opt);
        } else {
          pos = P.indexOf(opt)
          P.splice(pos, 1)
          P.unshift(opt)
        }
        firebaseDb.firestore().collection('User').doc(userid).update({
          Preferences: P
        });
      });
    }
  }

  function add(option) {
    setSearch(option)
    document.getElementById("search").value = option;
    setDisplay(false)
    addOrEditemploi(option)
  }
  function renderResults(results) {
    if (!results.length) {
      return searchWrapper.classList.remove('show');
    }
    var content = [];
    content.push(results)
    setOptions(content)
    searchWrapper.classList.add('show');
  }
  const [convertedText, setConvertedText] = useState('');
  const trans = () => {
    var e = document.getElementById('search').value
    axios
      .post(
        'https://translation.googleapis.com/language/translate/v2',
        {},
        {
          params: {
            q: e,
            target: 'en',
            key: 'AIzaSyCHUCmpR7cT_yDFHC98CZJy2LTms-IwDlM'
          }
        }
      )
      .then((response) => {
        setConvertedText(response.data.data.translations[0].translatedText);
      })
      .catch((err) => {
        console.log('rest api error', err);
      });
    document.getElementById("search").value = convertedText;
  }
  return (
    <>

      <div ref={wrapperRef} class="container">
        <div class="wrapper">
          <input type="text" id="search"
            class="input-search" name="search"
            onKeyPress={event => {
              if (event.key === 'Enter') {
                add(event.target.value)
              }
            }}
            value={search} id="search"
            placeholder="Rechercher par Tags..."
            autocomplete="chrome-off"
            onChange={(event) => {
              addEventListener(event.target.value);
              setDisplay(!display);
              setSearch(event.target.value);
            }}
          />
          <button class="btn_search"><VscSearch></VscSearch></button>
          {
            display && (
              <div class="results" style={{ "overflow": 'scroll', "height": "110px" }}>
                <ul>
                  {Options.map(opt => {
                    return opt.map(o => {
                      return <li onClick={(event) => { add(o) }}>{o}</li>
                    })
                  })
                  }

                </ul>
              </div>)}

        </div>

      </div>
      <button className="btn-translate" onClick={e => trans(e)} ><HiTranslate></HiTranslate>Traduire</button>
      <hr />
      <button style={{ marginLeft: '20px' }} onClick={(event) => setshowpost(true)}><HiOutlineViewList size="25"></HiOutlineViewList>Tous</button>
      <button style={{ marginLeft: '20px' }} onClick={(event) => setshowpost(false)}><HiViewGridAdd size="25"></HiViewGridAdd>Publication Récement ajoutée</button>

      <hr />
      {showpost &&
        <div className="container-fluid">
          <div className="row">
            {

              Object.entries(Object.assign({}, formations.tab1)).map((key, value) => {

                Object.keys(key[1].obj.Tags).map(num => {
                  if (search == '') {
                    if (listperferences.includes(key[1].obj.Tags[num].title)) {
                      if (formtag.lastIndexOf(key[1]) === -1) {
                        if (listperferences.lastIndexOf(key[1].obj.Tags[num].title) === 0) {
                          formtag.unshift(key[1]);
                        } else {
                          if (!formtag.includes(key[1])) {
                            Object.keys(formtag).map(ftg => {
                              Object.keys(formtag[ftg].obj.Tags).map(ftgs => {
                                if (listperferences.includes(formtag[ftg].obj.Tags[ftgs].title)) {
                                  p = listperferences.indexOf(formtag[ftg].obj.Tags[ftgs].title)
                                  i = formtag.indexOf(formtag[ftg])
                                }
                              })
                            })
                            p1 = listperferences.indexOf(key[1].obj.Tags[num].title)
                            if (p1 < p) {
                              formtag.splice(i, 0, key[1])
                            } else {
                              formtag.push(key[1]);
                            }
                          }
                        }
                      } else {
                        if (listperferences.indexOf(key[1].obj.Tags[num].title) === 0) {
                          p = formtag.indexOf(key[1])
                          formtag.splice(p, 1)
                          formtag.unshift(key[1])
                        }
                      }
                    }
                  } else if (key[1].obj.Tags[num].title.toLowerCase().includes(search.toLowerCase())) {
                    if (!filtreformation.includes(key[1])) {
                      filtreformation.push(key[1])
                    }
                  }
                })

                Object.keys(filtreformation).map(filt1 => {
                  Object.keys(filtreformation[filt1].obj.Tags).map(num2 => {
                    if (listperferences.includes(filtreformation[filt1].obj.Tags[num2].title)) {
                      if (formtag.lastIndexOf(filtreformation[filt1]) === -1) {
                        if (listperferences.lastIndexOf(filtreformation[filt1].obj.Tags[num2].title) === 0) {
                          formtag.unshift(filtreformation[filt1]);
                        } else {
                          if (!formtag.includes(filtreformation[filt1])) {
                            p = listperferences.indexOf(filtreformation[filt1].obj.Tags[num2].title)
                            formtag.splice(p, 0, filtreformation[filt1])
                          }
                        }

                      } else {
                        console.log("deja existe !")
                        p = formtag.indexOf(filtreformation[filt1])
                        formtag.splice(p, 1)

                      }
                    }
                  })
                })

              })}


            {

              Object.keys(formtag).map(p => {

                return (

                  <div className="col-md-4" key={formtag[p].id}>
                    <div className="card text-center shadow" >
                      <div className="overflow">
                        {
                          formtag[p].obj.NbPlaces != undefined &&
                          <Link to={"/afficheformation/" + formtag[p].id} >
                            <img height="190"
                              src={"https://firebasestorage.googleapis.com/v0/b/firsttest-b7475.appspot.com/o/images%20Formations%2F" + formtag[p].obj.Image + "?alt=media&token=39971314-3f2c-4b25-b0d1-7c820b12489c"}
                              alt="logo" className="card-img-top" />
                          </Link>
                        }
                        {
                          formtag[p].obj.NbPlaces === undefined &&
                          <Link to={formtag[p].obj.Contrat === 'stage' ? "/affichestage/" + formtag[p].id : "/afficheemploi/" + formtag[p].id} >
                            <img height="190"
                              src={"https://firebasestorage.googleapis.com/v0/b/firsttest-b7475.appspot.com/o/images%20Offres%20Travaille%2F" + formtag[p].obj.Image + "?alt=media&token=39971314-3f2c-4b25-b0d1-7c820b12489c"}
                              alt="logo" className="card-img-top" />
                          </Link>
                        }

                      </div>
                      <div className="card-body text-dark">
                        <h4 className="card-title">  {
                          formtag[p].obj.NbPlaces != undefined &&
                          <Link to={"/afficheformation/" + formtag[p].id} style={linkstyle}>{formtag[p].obj.Nom.toUpperCase()}</Link>
                        }
                          {
                            formtag[p].obj.NbPlaces === undefined &&
                            <Link to={formtag[p].obj.Contrat === 'stage' ? "/affichestage/" + formtag[p].id : "/afficheemploi/" + formtag[p].id} style={linkstyle}>{formtag[p].obj.Nom.toUpperCase()}</Link>
                          }
                        </h4>
                        <p className="card-text text-dark">
                          {formtag[p].obj.Domaine}<br />
                          <HiClock></HiClock><label style={{ color: 'grey' }}>Publié le:</label> {formtag[p].obj.DatePost}
                          <hr />

                          {Object.keys(formtag[p].obj.Tags).map(num => {

                            return (
                              <input key={formtag[p].obj.Tags[num].id} type="button" className="myinput" value={'#' + formtag[p].obj.Tags[num].title} />

                            );
                          })
                          }

                        </p>
                        <p className="card-text"></p>


                      </div>
                    </div>
                  </div>

                );


              })

            }
 
            {Object.entries(Object.assign({}, formations.tab1)).map((key, value) => {
              Object.keys(key[1].obj.Tags).map(num => {
                if (search == '') {
                  if (!formtag.includes(key[1])) {
                    if (!tabfiltre.includes(key[1])) {
                      sp = key[1].obj.DatePost.split("à")
                     if(d.includes(sp[0])){
                        tabfiltre.unshift(key[1])
                     }else{
                      tabfiltre.push(key[1])
                     }
                    }
                  }
                } else if (key[1].obj.Tags[num].title.toLowerCase().includes(search.toLowerCase())) {
                  if (!tabg.includes(key[1])) {
                    tabg.push(key[1])
                  }
                }
              })
            })
            }
            {Object.keys(tabg).map(filt => {
              if (!tabfiltre.includes(tabg[filt]) && !formtag.includes(tabg[filt])) {
                tabfiltre.push(tabg[filt])
              }
            })
            }

            {

              Object.keys(tabfiltre).map(p => {

                return (

                  <div className="col-md-4" key={tabfiltre[p].id}>
                    <div className="card text-center shadow" >
                      <div className="overflow">
                        {
                          tabfiltre[p].obj.NbPlaces != undefined &&
                          <Link to={"/afficheformation/" + tabfiltre[p].id} >
                            <img height="190"
                              src={"https://firebasestorage.googleapis.com/v0/b/firsttest-b7475.appspot.com/o/images%20Formations%2F" + tabfiltre[p].obj.Image + "?alt=media&token=39971314-3f2c-4b25-b0d1-7c820b12489c"}
                              alt="logo" className="card-img-top" />
                          </Link>
                        }
                        {
                          tabfiltre[p].obj.NbPlaces === undefined &&
                          <Link to={tabfiltre[p].obj.Contrat === 'stage' ? "/affichestage/" + tabfiltre[p].id : "/afficheemploi/" + tabfiltre[p].id} >
                            <img height="190"
                              src={"https://firebasestorage.googleapis.com/v0/b/firsttest-b7475.appspot.com/o/images%20Offres%20Travaille%2F" + tabfiltre[p].obj.Image + "?alt=media&token=39971314-3f2c-4b25-b0d1-7c820b12489c"}
                              alt="logo" className="card-img-top" />
                          </Link>
                        }

                      </div>
                      <div className="card-body text-dark">
                        <h4 className="card-title">  {
                          tabfiltre[p].obj.NbPlaces != undefined &&
                          <Link to={"/afficheformation/" + tabfiltre[p].id} style={linkstyle}>{tabfiltre[p].obj.Nom}</Link>
                        }
                          {
                            tabfiltre[p].obj.NbPlaces === undefined &&
                            <Link to={tabfiltre[p].obj.Contrat === 'stage' ? "/affichestage/" + tabfiltre[p].id : "/afficheemploi/" + tabfiltre[p].id} style={linkstyle}>{tabfiltre[p].obj.Nom.toUpperCase()}</Link>
                          }
                        </h4>
                        <p className="card-text text-dark">
                          {tabfiltre[p].obj.Domaine}<br />
                          <HiClock></HiClock><label style={{ color: 'grey' }}>Publié le:</label> {tabfiltre[p].obj.DatePost}
                          <hr />

                          {Object.keys(tabfiltre[p].obj.Tags).map(num => {

                            return (
                              <input key={tabfiltre[p].obj.Tags[num].id} type="button" className="myinput" value={'#' + tabfiltre[p].obj.Tags[num].title} />

                            );
                          })
                          }

                        </p>
                        <p className="card-text"></p>


                      </div>
                    </div>
                  </div>

                );

              })

            }



          </div>
        </div>
      } 
      {!showpost && 
       <div className="container-fluid">
       <div className="row">
         { 
         Object.entries(Object.assign({}, formations.tab1)).map((key, value) => {
          sp = key[1].obj.DatePost.split("à")
          datenow = d.split('à')
          if(datenow[0] === sp[0]){
            tabfiltre.unshift(key[1])
         }
        
         })
         }
          {

          Object.keys(tabfiltre).map(p => {

  return (
    <div className="col-md-4" key={tabfiltre[p].id}>
    <div className="card text-center shadow" >
      <div className="overflow">
        {
          tabfiltre[p].obj.NbPlaces != undefined &&
          <Link to={"/afficheformation/" + tabfiltre[p].id} >
            <img height="190"
              src={"https://firebasestorage.googleapis.com/v0/b/firsttest-b7475.appspot.com/o/images%20Formations%2F" + tabfiltre[p].obj.Image + "?alt=media&token=39971314-3f2c-4b25-b0d1-7c820b12489c"}
              alt="logo" className="card-img-top" />
          </Link>
        }
        {
          tabfiltre[p].obj.NbPlaces === undefined &&
          <Link to={tabfiltre[p].obj.Contrat === 'stage' ? "/affichestage/" + tabfiltre[p].id : "/afficheemploi/" + tabfiltre[p].id} >
            <img height="190"
              src={"https://firebasestorage.googleapis.com/v0/b/firsttest-b7475.appspot.com/o/images%20Offres%20Travaille%2F" + tabfiltre[p].obj.Image + "?alt=media&token=39971314-3f2c-4b25-b0d1-7c820b12489c"}
              alt="logo" className="card-img-top" />
          </Link>
        }

      </div>
      <div className="card-body text-dark">
        <h4 className="card-title">  {
          tabfiltre[p].obj.NbPlaces != undefined &&
          <Link to={"/afficheformation/" + tabfiltre[p].id} style={linkstyle}>{tabfiltre[p].obj.Nom}</Link>
        }
          {
            tabfiltre[p].obj.NbPlaces === undefined &&
            <Link to={tabfiltre[p].obj.Contrat === 'stage' ? "/affichestage/" + tabfiltre[p].id : "/afficheemploi/" + tabfiltre[p].id} style={linkstyle}>{tabfiltre[p].obj.Nom.toUpperCase()}</Link>
          }
        </h4>
        <p className="card-text text-dark">
          {tabfiltre[p].obj.Domaine}<br />
          <HiClock></HiClock><label style={{ color: 'grey' }}>Publié le:</label> {tabfiltre[p].obj.DatePost}
          <hr />

          {Object.keys(tabfiltre[p].obj.Tags).map(num => {

            return (
              <input key={tabfiltre[p].obj.Tags[num].id} type="button" className="myinput" value={'#' + tabfiltre[p].obj.Tags[num].title} />

            );
          })
          }

        </p>
        <p className="card-text"></p>


      </div>
    </div>
  </div>


  )
  })  
  }
         </div>
         </div>
}
       </>


  )
}
export default Accueil;