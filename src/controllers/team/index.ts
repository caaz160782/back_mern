import { Request,Response } from "express";
import { User } from "../../models/user";
import { Project } from "../../models/Project";

export const findMemberByEmail = async (req: Request, res: Response) => {  
   const {email} =req.body
   const user = await User.findOne({email}).select('id email name')
   if(!user) {
    const error = new Error('Usuario no encontrado')
    return res.status(404).json({error: error.message}) 
   }
   res.json(user)   
  }

export const getProjectTeam = async (req: Request, res: Response) => {  
    const project = await (await Project.findById(req.project.id)).populate({
        path: 'team',
        select: 'id email name'
    })
    res.json(project.team)
 }  

export const addMemberById = async (req: Request, res: Response) => {  
    const {id} =req.body
    const user = await User.findById(id).select('id email name')    
   if(!user) {
    const error = new Error('Usuario no encontrado')
    return res.status(404).json({error: error.message}) 
   }   
   if(req.project.team.some(team => team.toString() === user.id.toString())) {
    const error = new Error('el usuario ya existe en el proyecto')
    return res.status(409).json({error: error.message}) 
   }   
   req.project.team.push(user.id)
   await req.project.save()
   res.send('Usuario agregado correctamente')       
 }  

 export const deleteMemberById = async (req: Request, res: Response) => {  
   const {idUser} =req.params
   if(!req.project.team.some(team => team.toString() === idUser.toString())) {
    const error = new Error('el usuario no existe en el proyecto')
    return res.status(409).json({error: error.message}) 
   } 
    req.project.team = req.project.team.filter(team => team.toString() !== idUser)
    await req.project.save()   
    res.send('Usuario ELIMINADO DEL projecto')       
 }
 

  