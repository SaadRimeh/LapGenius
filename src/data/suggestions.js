export function addSuggestion(payload){
  const list = loadSuggestions()
  list.unshift({ id: Date.now(), ...payload })
  localStorage.setItem('lg_suggestions', JSON.stringify(list))
}
export function loadSuggestions(){
  const saved = localStorage.getItem('lg_suggestions')
  if(saved){ try{ return JSON.parse(saved) }catch{} }
  return []
}
