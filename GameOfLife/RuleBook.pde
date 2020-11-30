class RuleBook
{
  ArrayList<Function<Grid>> rules;
  
  RuleBook()
  {
    rules = new ArrayList<Rule>(); 
  }
  
  void update()
  {
     for(Rule rule : rules)
     {
        rule.update(); 
     }
  }
  
  
}
