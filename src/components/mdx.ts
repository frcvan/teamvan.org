import Alert from "./Alert.astro";
import Collapse from "./Collapse.astro";
import ContentButton from "./ContentButton.astro";
import ContentButtonGroup from "./ContentButtonGroup.astro";
import Embed from "./Embed.astro";
import Fact from "./Fact.astro";
import Figure from "./Figure.astro";
import StatGrid from "./StatGrid.astro";
import TextLink from "./TextLink.astro";
import Timeline from "./Timeline.astro";
import TimelinePhase from "./TimelinePhase.astro";

const components = {
    a: TextLink,
    Alert,
    Collapse,
    Button: ContentButton,
    ButtonGroup: ContentButtonGroup,
    StatGrid,
    Fact,
    Timeline,
    Phase: TimelinePhase,
    Figure,
    Embed,
};

export default components;
