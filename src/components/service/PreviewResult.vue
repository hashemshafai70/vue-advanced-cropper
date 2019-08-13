<script>
import bem from 'easy-bem';
import classnames from 'classnames';
import { getStyleTransforms } from '../../core/image';

const cn = bem('vue-preview-result');

export default {
	name: 'PreviewResult',
	props: {
		img: {
			type: Object,
		},
		classname: {
			type: String,
		},
		imageClassname: {
			type: String,
		},
		resultCoordinates: {
			type: Object,
			default() {
				return {
					width: 0,
					height: 0,
					left: 0,
					top: 0,
				};
			},
		},
		stencilCoordinates: {
			type: Object,
			default() {
				return {
					width: 0,
					height: 0,
					left: 0,
					top: 0,
				};
			},
		},
	},
	computed: {
		classnames() {
			return {
				default: classnames(cn(), this.classname),
				image: classnames(cn('image'), this.imageClassname),
				wrapper: cn('wrapper'),
			};
		},
		wrapperStyle() {
			return {
				width: `${this.stencilCoordinates.width}px`,
				height: `${this.stencilCoordinates.height}px`,
				left: `calc(50% - ${this.stencilCoordinates.width/2}px)`,
				top: `calc(50% - ${this.stencilCoordinates.height/2}px)`,
			};
		},
		imageStyle() {
			const imageTransforms = this.img.transforms;
			const imageWidth = this.img.size.width;
			const imageHeight = this.img.size.height;
			const coefficient = this.stencilCoordinates.height / this.resultCoordinates.height;
			const height = imageHeight * coefficient;
			const width = imageWidth * coefficient;
			const flipped = imageTransforms.flipped;

			const result = {
				width: `${width}px`,
				height: `${height}px`,
			};
			if (flipped) {
				result.width = `${height}px`;
				result.height = `${width}px`;
				result.left = `${-this.stencilCoordinates.left - (height - width)/2}px`;
				result.top = `${-this.stencilCoordinates.top - (width - height)/2}px`;
			} else {
				result.width = `${width}px`;
				result.height = `${height}px`;
				result.left = `${-this.stencilCoordinates.left}px`;
				result.top = `${-this.stencilCoordinates.top}px`;
			}
			result.transform = getStyleTransforms(imageTransforms);
			return result;
		},
	},
};
</script>

<template>
  <div
    :class="classnames.default"
  >
    <div
      ref="wrapper"
      :class="classnames.wrapper"
      :style="wrapperStyle"
    >
      <img
        ref="image"
        :src="img.src"
        :class="classnames.image"
        :style="imageStyle"
      >
    </div>
  </div>
</template>

<style lang="scss">
.vue-preview-result{
	overflow: hidden;
	box-sizing: border-box;
	position: absolute;
	height: 100%;
	width: 100%;
	&__wrapper {
		position: absolute;
	}

	&__image {
		pointer-events: none;
		position: absolute;
		user-select: none;
		transform-origin: center;
		// Workaround to prevent bugs at the websites with max-width
		// rule applied to img (Vuepress for example)
		max-width: unset !important;
	}
}
</style>