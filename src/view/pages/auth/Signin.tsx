import { TypographyVariant } from "../../components/types";
import Typography from "../../components/Typography/Typography";

const SignIn: React.FC = () => {
  return (
    <div>
      <Typography variant={TypographyVariant.TITLE}>Title</Typography>
      <Typography variant={TypographyVariant.SUBTITLE}>Subtitle</Typography>
      <Typography variant={TypographyVariant.BODY_DEFAULT_MEDIUM}>Body default medium</Typography>
      <Typography variant={TypographyVariant.BODY_SMALL_MEDIUM}>Body small medium</Typography>
      <Typography variant={TypographyVariant.SMALL}>Smalllllll</Typography>


    </div>
  );
};

export default SignIn;
