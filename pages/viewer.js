import React from 'react';

import styles from '../styles/Viewer.module.css'

export default function Viewer(props) {
  const [perspective, setPerspective] = React.useState('byName');
  if(!props.editorState){
    return(
      <div style={style}>
        <div>import first</div>
      </div>
    )
  }
  const objForDisp = JSON.parse(props.editorState)
  const people = objForDisp.people
  const questions = objForDisp.questions

  const [key, setKey] = React.useState()
  const [mainContent, setMainContent] = React.useState(getContent(perspective, people[0].name));
  function getContent(perspective, key){
    const content = []
    if(perspective === 'byName'){
      people.some((person) => {
        if(person.name === key){
          content.push({
            title: "名前",
            description: person.name,
          })
          for(let i in questions){
            content.push({
              title: questions[i],
              description: person.answers[i],
            })
          }
          return true
        }
      })
    }
    
    if(perspective === 'byQuestion'){
      const index = questions.indexOf(key)
      people.forEach((person) => {
        content.push({
          title: person.name,
          description: person.answers[index],
        })
      })
    }
    return content
  }

  const secondMenu = []
  if(perspective === 'byName'){
    people.forEach(person => {
      secondMenu.push(
        <div 
          className={`${styles.secondMenuButton} ${key === person.name ? styles.selected: ''}`} 
          key={person.name}
          onClick={() => {
            setMainContent(getContent(perspective, person.name))
            setKey(person.name)
          }}>
            {person.name}
        </div>)
    });
  }
  if(perspective === 'byQuestion') {
    questions.forEach(question => {
      secondMenu.push(
        <div 
          className={`${styles.secondMenuButton} ${key === question ? styles.selected: ''}`} 
          key={question}
          onClick={() => {
            setMainContent(getContent(perspective, question))
            setKey(question)
          }}>
            {question}
        </div>)
    })
  }

  const mainView = []
  for(let content of mainContent){
    mainView.push(
      <div className={styles.mainContent}>
        <div className={styles.mainContentTitle}>
          {content.title}
        </div>
        <div className={styles.mainContentDescription}>
          {content.description}
        </div>
      </div>
    )
  }
  
  return(
    <div className={styles.viewer}>
      <div className={styles.firstMenu}>
        <div 
          className={`${styles.firstMenuButton} ${perspective === 'byName' ? styles.selected : ''}`} 
          onClick={() => {
              setPerspective('byName')
              setMainContent(getContent('byName', people[0].name))
              setKey(people[0].name)
            }}>
            by name
        </div>
        <div 
          className={`${styles.firstMenuButton} ${perspective === 'byQuestion' ? styles.selected : ''}`} 
          onClick={() => {
              setPerspective('byQuestion')
              setMainContent(getContent('byQuestion', questions[0]))
              setKey(questions[0])
            }}>
            by question
        </div>
      </div>
      <div className={styles.secondMainContainer}>
        <div className={styles.secondMenu}>
            {secondMenu}
        </div>
        <div className={styles.mainView}>
          { mainView }
        </div>
      </div>
    </div>
  )
}