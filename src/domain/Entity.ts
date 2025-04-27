export default abstract class Entity<Props, RenderedProps = unknown> {
	public constructor(protected props: Props) {}

	public abstract render(): RenderedProps | Promise<RenderedProps>;
}
