import React, { useState } from "react";
// import { Button, Modal, Box, TextField, Typography, Grid, MenuItem } from "@mui/material";
import { MdOutlineThermostat, MdOpacity } from "react-icons/md";

export default function MonitoramentoPlantio() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className="p-6 bg-[#f7fdf7] rounded-2xl shadow-md">
      <h1 className="text-3xl font-bold text-green-800 mb-4">Morango</h1>

      {/* Dados simulados */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-4 rounded-lg shadow flex flex-col items-center">
          <MdOutlineThermostat size={30} className="text-red-600" />
          <p className="text-2xl font-semibold">31,8 °C</p>
          <p className="text-sm text-red-600">Temperatura Alta</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow flex flex-col items-center">
          <MdOpacity size={30} className="text-blue-600" />
          <p className="text-2xl font-semibold">58%</p>
          <p className="text-sm text-gray-600">Umidade</p>
        </div>
      </div>

      <div className="flex justify-end">
        <Button
          variant="contained"
          onClick={handleOpen}
          sx={{ backgroundColor: "#138A36", "&:hover": { backgroundColor: "#0f6a2b" } }}
        >
          Editar Plantio
        </Button>
      </div>

      {/* ================= MODAL ================= */}
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "80%",
            maxWidth: 900,
            bgcolor: "background.paper",
            borderRadius: 3,
            boxShadow: 24,
            p: 4,
            overflowY: "auto",
            maxHeight: "90vh",
          }}
        >
          <Typography variant="h5" fontWeight="bold" mb={3} color="#2e7d32">
            Editar Plantio
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Nome do Plantio" defaultValue="Morango" />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField fullWidth type="date" label="Data do Plantio" InputLabelProps={{ shrink: true }} defaultValue="2025-06-12" />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField fullWidth type="date" label="Data da Colheita" InputLabelProps={{ shrink: true }} defaultValue="2025-11-08" />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Variedade" defaultValue="Morango Sabrina" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Substrato" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Tipo de Solo" />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Adubação Utilizada" defaultValue="NPK 10-10-10 + Esterco curtido" />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth multiline minRows={3} label="Descrição" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button fullWidth variant="outlined" component="label">
                Importar Imagem
                <input hidden accept="image/*" type="file" />
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField select fullWidth label="Estágio Atual">
                <MenuItem value="Germinação">Germinação</MenuItem>
                <MenuItem value="Crescimento">Crescimento</MenuItem>
                <MenuItem value="Floração">Floração</MenuItem>
                <MenuItem value="Colheita">Colheita</MenuItem>
              </TextField>
            </Grid>
          </Grid>

          <div className="flex justify-end mt-6">
            <Button
              variant="contained"
              sx={{ backgroundColor: "#138A36", "&:hover": { backgroundColor: "#0f6a2b" } }}
              onClick={handleClose}
            >
              Atualizar
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
