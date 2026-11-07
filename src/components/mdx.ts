import Alert from "./Alert.astro";
import Collapse from "./Collapse.astro";
import Comparison from "./Comparison.astro";
import ComparisonRow from "./ComparisonRow.astro";
import ContentButton from "./ContentButton.astro";
import ContentButtonGroup from "./ContentButtonGroup.astro";
import Coverage from "./Coverage.astro";
import Embed from "./Embed.astro";
import Fact from "./Fact.astro";
import Figure from "./Figure.astro";
import Nameplate from "./Nameplate.astro";
import Quip from "./Quip.astro";
import Skills from "./Skills.astro";
import StatGrid from "./StatGrid.astro";
import TextLink from "./TextLink.astro";
import Timeline from "./Timeline.astro";
import TimelinePhase from "./TimelinePhase.astro";

const components = {
    a: TextLink,
    Alert,
    Collapse,
    Comparison,
    ComparisonRow,
    Button: ContentButton,
    ButtonGroup: ContentButtonGroup,
    Coverage,
    Quip,
    Skills,
    StatGrid,
    Fact,
    Timeline,
    Phase: TimelinePhase,
    Figure,
    Nameplate,
    Embed,
};

export default components;
