import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grow,
  Typography,
  Container,
  Box,
} from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { ButtonCancel, ButtonDelete } from "../Style/StyledComponent/buttom-style";
import DeleteAlert from "../Assets/Images/deleteAlert.png";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Grow direction="up" ref={ref} {...props} unmountOnExit />;
});

const useConfirmMessage = ({
  onConfirm = () => {},
  title = "الرجاء التأكيد",
  text = "هل انت متأكد انك تريد المتابعة؟",
  variant = "confirm",
}) => {
  // Ghange lang
  // const lang = useSelector((state) => state.lang.value.lang);
  // const globalLang = useSelector((state) => state.lang.value.global);

  ///////////////////////////////
  const [open, setOpen] = useState(false);
  const [args, setArgs] = useState(null);

  const handleOpen = (...params) => {
    setArgs([...params]);
    setOpen(true);
  };
  console.log(onConfirm, args);
  return [
    handleOpen,
    <Dialog
      fullWidth="sm"
      open={open}
      onClose={() => setOpen(false)}
      sx={{
        "& .MuiPaper-root": {
          borderRadius: "10px !important",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#101828",
          width: "400px",
          

          boxShadow: "0px 8px 8px -4px #10182808 ",
        },
      }}
      TransitionComponent={Transition}
    >
      <Container sx={{ py: "24px" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img src={DeleteAlert} alt="deletealert" />
        </Box>
        <DialogTitle
          sx={{
            fontFamily:'Cairo',
            fontSize: "18px",
            fontWeight: 600,
            lineHeight: " 28px",
            letterSpacing: "0em",
            textAlign: "center",
          }}
        >
          تأكيد الحذف{" "}
        </DialogTitle>
        <DialogContent
          sx={{
            fontFamily:'Cairo',
            fontSize: "14px",
            fontWeight: 400,
            lineHeight: "20px",
            letterSpacing: "0em",
            textAlign: "center",
            color: "#667085",
          }}
        >
          هل أنت متأكد أنك تريد حذف هذا المنتج؟ لا يمكن التراجع عن هذا الإجراء.
        </DialogContent>

        <DialogActions
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "12px",
            mt: "16px",
            "&.MuiDialogActions-root": { ml: 0 },
          }}
        >
          {variant === "confirm" && (
            <>
              <ButtonCancel
                sx={{
                  border: "1px solid #D0D5DD",
                  boxShadow: "0px 1px 2px 0px #1018280D",
                  borderRadius: "8px",
                  height: "44px !important",
                  fontSize: "16px !important",
                  width: "50%!important",
                  
                }}
                onClick={() => setOpen(false)}
              >
                {/* {globalLang.no[lang]} */}
                إلغاء
              </ButtonCancel>
              <ButtonDelete
                onClick={() => {
                  onConfirm(...args);
                  setOpen(false);
                }}
              >
                حذف{" "}
              </ButtonDelete>
            </>
          )}
          {variant === "alert" && (
            <ButtonDelete onClick={() => setOpen(false)}>موافق</ButtonDelete>
          )}
        </DialogActions>
      </Container>
    </Dialog>,
  ];
};

export default useConfirmMessage;
