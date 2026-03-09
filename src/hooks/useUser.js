import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


// VERIFICAR SI EL USUARIO ESTA LOGUEADO

export function useUser() {

    const navigate = useNavigate();

    useEffect(() => {

        const usuario = useUsuarioGuardado();

        if (!usuario) {
            navigate("/login");
        }
    }, [navigate]);
}

// VERIFICAR SI EL USUARIO ES ADMINISTRADOR

export function useAdmin() {
    const navigate = useNavigate();
    useEffect(() => {

        const usuario = useUsuarioGuardado();
        if (!usuario || usuario.tipo !== "administrador") {
            window.alert("No tienes permisos para acceder a esta página");
            navigate("/cuentaUsuario");
        }
    }, [navigate]);
}


// DEVUELVE EL USUARIO LOGUEADO

export function useUsuarioGuardado() {
    return JSON.parse(localStorage.getItem("usuario"));;
}


