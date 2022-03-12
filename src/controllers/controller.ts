import executeQuery from "../services/mysql.service"
import {encrypt, compare} from "../services/handleBcrypt"

const getUser =async (req, res) => {
    try{
        const {correo, contraseña} = req.body;
        const response = await executeQuery(`SELECT idusuario, correo, contraseña FROM usuarios WHERE correo = '${correo}'`);
        
        
        const checkContraseña = await compare(contraseña.toString(), response[0].contraseña)
        
        
        if(checkContraseña){
            const userData ={
                "idUser: ": response[0].idusuario,
                correo, 
                "contraseña": "validated"
            }
            const data = {
            message: `${response.length} datos encontrados`,
            datos:  userData 
            }
            res.json(data);
        }else{
            res.json({ error:"password"})
        }
        
    }catch(error){
        console.log(error);
        res.status(500).send(error);
    }
    
}

const getCuenta =async (req, res) => {
    try{
        const {id} = req.body;
                
        const response = await executeQuery(`SELECT idcuenta, correo, saldo FROM cuenta INNER JOIN usuarios ON
                                             cuenta.idusuarioFK = usuarios.idusuario 
                                             INNER JOIN monedero ON cuenta.idsaldoFK = monedero.idsaldo
                                             where idusuarioFK=${id}`);
        const data = {
            message: `${response.length} datos encontrados`,
            datos: response.length > 0 ? response : null
        }
        res.json(data);
    }catch(error){
        console.log(error);
        res.status(500).send(error);
    }
    
}

const getMovimientos =async (req, res) => {
    try{
        const {id} = req.params;
        const response = await executeQuery(`SELECT * FROM movimientos WHERE idcuentaFK = ${req.params.id}`);
        const data = {
            message: `${response.length} datos encontrados`,
            datos: response.length > 0 ? response : null
        }
        res.json(data);
    }catch(error){
        console.log(error);
        res.status(500).send(error);
    }
    
}

const postUser = async(req, res) => {
    const {correo, contraseña} = req.body;  
    try{
        
        const cHash = await encrypt(contraseña)
        const response = await executeQuery(`INSERT INTO usuarios (correo, contraseña) VALUES ('${correo}', '${cHash}')`);
        const idMonedero = await crearMonedero();
        const idCuenta = await crearCuenta(response.insertId, idMonedero);
        await movimiento(idCuenta, 0, 0);

        res.status(201).json({message: 'created', idUser: response.insertId, idCuenta: idCuenta});
        
    }catch(error){
        console.log(error);
        res.status(500).send(error);
    }
}

const putRetiro = async(req, res) => {
    const {id, retiro} = req.body;  
    try{
        const cuenta = await executeQuery(`SELECT * FROM cuenta INNER JOIN usuarios ON cuenta.idusuarioFK = usuarios.idusuario
                                            INNER JOIN monedero ON cuenta.idsaldoFK = monedero.idsaldo where idusuarioFK=${id}`);
        
        if(retiro>=5000 && (cuenta[0].saldo - retiro >= 0 )) {
            const idSaldo = cuenta[0].idsaldoFK
            const response = await executeQuery(`UPDATE monedero SET saldo = ${parseInt(cuenta[0].saldo) - retiro } WHERE idsaldo = ${idSaldo}`);
            await movimiento(cuenta[0].idcuenta, cuenta[0].saldo, parseInt(cuenta[0].saldo) - retiro)
            res.status(201).json({message: 'updated',  cuenta: cuenta[0].idCuenta, response});
        }else{
            res.status(201).json({message: 'Not updated',  details: "minimum excceded"});
        }

        
    }catch(error){
        console.log(error);
        res.status(500).send(error);
    }
}

const putAbono = async(req, res) => {
    const {id, abono} = req.body;  
    try{
        const cuenta = await executeQuery(`SELECT * FROM cuenta INNER JOIN usuarios ON cuenta.idusuarioFK = usuarios.idusuario
                                            INNER JOIN monedero ON cuenta.idsaldoFK = monedero.idsaldo where idusuarioFK=${id}`);
        
        if(abono>=2000 ) {
            const idSaldo = cuenta[0].idsaldoFK
            const response = await executeQuery(`UPDATE monedero SET saldo = ${parseInt(cuenta[0].saldo) + abono } WHERE idsaldo = ${idSaldo}`);
            await movimiento(cuenta[0].idcuenta, cuenta[0].saldo, parseInt(cuenta[0].saldo) + abono)
            res.status(201).json({message: 'updated',  cuenta: cuenta[0].idCuenta, response});
        }else{
            res.status(201).json({message: 'Not updated',  details: "minimum excceded"});
        }

        
    }catch(error){
        console.log(error);
        res.status(500).send(error);
    }
}

async function movimiento(idCuenta, saldoAnterior, saldoNuevo){

    try{
        const movimiento = await executeQuery(`INSERT INTO movimientos (idcuentaFK, saldoanterior, saldonuevo) VALUES ('${idCuenta}', '${saldoAnterior}', '${saldoNuevo}')`);
        return true
    }catch(error){
        console.log(error);
        return(error);
    }
}

async function crearCuenta(idUsuario, idMonedero){
    try{
        const response = await executeQuery(`INSERT INTO cuenta (idusuarioFK, idsaldoFK) VALUES (${idUsuario}, ${idMonedero})`);
        return response.insertId
        
    }catch(error){
      return  console.log("error al crear monedero: " + error);
    }
}

async function  crearMonedero (){
    try{
        const response = await executeQuery(`INSERT INTO monedero (saldo) VALUES (0)`);
         
        
        return  response.insertId;
        
    }catch(error){
      return  console.log("error al crear monedero: " + error);
    }
}


export {getCuenta, getUser, getMovimientos, postUser, putRetiro, putAbono}

