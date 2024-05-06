import { Box, Container, Divider, Grid } from "@mui/material"
import ResponsiveLayout from "../Layout/Layout"
import PageMeta from "../Layout/MetaPage"
import ProfileTabs from "./ProfileTabs"
import { GrayText } from "../../Style/StyledComponents/Typography"
import HeroTitle from "../Layout/HeroTitle"
import { useSelector } from "react-redux"
import { useTranslation } from "react-i18next"
import { useTheme } from "@emotion/react"

const Profile = () => {

    const shopInfo = JSON.parse(localStorage.getItem("shopInfo"));
  const token = JSON.parse(localStorage.getItem("userinfo"));
  const userDetails = useSelector((state) => state.userInfo.value);

  const { t } = useTranslation();
  const theme = useTheme();
  const crumbs = [
    {
      label: `${t("Home")}`,
      link: `/t2/${shopInfo?.sub_domain}`,
      active: false,
    },
    { label: `${t("Profile")}`, active: false },
  ];

    return(
        <ResponsiveLayout>
      <PageMeta
        title={`${shopInfo?.sub_domain}-${t("My Cart")}`}
        desc="Description of my page for SEO"
        name={shopInfo?.full_name}
        type={shopInfo?.shop_type_name}
        image={shopInfo?.logo}
      />
      <Box sx={{ marginY: { lg: "90px", md: 2, sm: 2, xs: 2 } }}>
        <Box
          sx={{
            pr: 5,
            mb: 2,
          }}
        >
          <GrayText>
            <HeroTitle crumbs={crumbs} />
          </GrayText>
        </Box>
        <Divider />
        <Container
          maxWidth="xl"
          sx={{ marginTop: { lg: "69px", md: "0", sm: "0", xs: "0" } }}
        >
          <Grid
            container
            spacing={2}
            sx={{
              flexGrow: 1,
              bgcolor: "background.paper",
              display: "flex",
              height: "100%",
              overflowY: "hidden",
            }}
          >
            <Grid lg={4} md={4} xs={12} sm={12}>
              <ProfileTabs />
            </Grid>
            <Grid lg={8} md={4} xs={12} sm={12}>
                {/* here the content of any tab of the menu */}
            </Grid>
          </Grid>
        </Container>
      </Box>
    </ResponsiveLayout>
    )

}


export default Profile