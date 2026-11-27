This project is here to assist with the creatation of data mirgration scripts.
Make changes to the model (pocos, dbset in context, configuration changes, ect)
Built the solution
Set this project (ProductManager.Tool.EF) as the start up project by right clicking the project in VS
open the package manager console
set ProductManager.Data.Ef as the default project by setting the drop down in the PM command window
type the command  add-migration {name} in the console where the name gives meaning to the change you made in the model