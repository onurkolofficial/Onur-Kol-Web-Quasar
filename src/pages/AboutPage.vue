<template>
  <div class="q-pa-md q-gutter-sm">
    <q-breadcrumbs active-color="accent">
      <q-breadcrumbs-el :label="$t('navigation.home')" icon="home" to="/" />
      <q-breadcrumbs-el :label="$t('navigation.about')" icon="double_arrow" />
    </q-breadcrumbs>
  </div>
  <div>
    <LangSelectorTemplate />
  </div>
  <q-page padding class="bg-image">
    <div class="bg-image-filter">
      <!-- content -->
      <!-- For Mobile -->
      <div class="lt-sm">
        <q-card flat dark style="background: none">
          <q-card-section class="q-pa-lg">
            <q-card flat dark style="background: none">
              <q-img src="~assets/images/onur-kol.jpg">
                <div class="absolute-bottom">
                  <div class="text-h6">Onur Kol</div>
                  <q-item-label class="text-white" caption>
                    Web & Android Developer
                  </q-item-label>
                </div>
              </q-img>

              <q-card-section>
                <q-expansion-item icon="stars" :label="$t('about.skillsText')">
                  <q-card style="background: none">
                    <q-card-section>
                      <q-list>
                        <q-item>
                          <q-item-section>
                            <q-item-label>Android(Java)</q-item-label>
                          </q-item-section>
                          <q-item-section side>
                            <q-rating
                              v-model="skillAndroid"
                              size="1em"
                              color="orange"
                              readonly
                            />
                          </q-item-section>
                        </q-item>

                        <q-separator inset />

                        <q-item>
                          <q-item-section>
                            <q-item-label>PHP</q-item-label>
                          </q-item-section>
                          <q-item-section side>
                            <q-rating
                              v-model="skillPhp"
                              size="1em"
                              color="orange"
                              readonly
                            />
                          </q-item-section>
                        </q-item>

                        <q-separator inset />

                        <q-item>
                          <q-item-section>
                            <q-item-label>HTML/CSS</q-item-label>
                          </q-item-section>
                          <q-item-section side>
                            <q-rating
                              v-model="skillHTMLCSS"
                              size="1em"
                              color="orange"
                              readonly
                            />
                          </q-item-section>
                        </q-item>

                        <q-separator inset />

                        <q-item>
                          <q-item-section>
                            <q-item-label>Javascript</q-item-label>
                          </q-item-section>
                          <q-item-section side>
                            <q-rating
                              v-model="skillJavascript"
                              size="1em"
                              color="orange"
                              readonly
                            />
                          </q-item-section>
                        </q-item>

                        <q-separator inset />

                        <q-item>
                          <q-item-section>
                            <q-item-label>Vue.js</q-item-label>
                          </q-item-section>
                          <q-item-section side>
                            <q-rating
                              v-model="skillVue"
                              size="1em"
                              color="orange"
                              readonly
                            />
                          </q-item-section>
                        </q-item>

                        <q-separator inset />

                        <q-item>
                          <q-item-section>
                            <q-item-label>{{
                              $t("about.graphicDesignText")
                            }}</q-item-label>
                          </q-item-section>
                          <q-item-section side>
                            <q-rating
                              v-model="skillGDesign"
                              size="1em"
                              color="orange"
                              readonly
                            />
                          </q-item-section>
                        </q-item>

                        <q-separator inset />
                      </q-list>
                    </q-card-section>
                  </q-card>
                </q-expansion-item>
              </q-card-section>
            </q-card>
          </q-card-section>
          <q-card-section>
            <div class="text-h3" style="opacity: 0.8">
              {{ $t("about.biographyText") }}
            </div>
          </q-card-section>
          <q-card-section>
            <div v-html="biographyText" />
          </q-card-section>
        </q-card>
      </div>
      <!-- For Desktop/Tablet -->
      <div class="gt-xs">
        <q-card flat dark style="background: none">
          <q-card-section horizontal>
            <q-card-section class="q-pa-xs" style="width: 24%">
              <q-card flat dark style="background: none">
                <q-img src="~assets/images/onur-kol.jpg">
                  <div class="absolute-bottom">
                    <div class="text-h6">Onur Kol</div>
                    <q-item-label class="text-white" caption>
                      Web & Android Developer
                    </q-item-label>
                  </div>
                </q-img>
                <q-card-section style="padding: 0">
                  <q-expansion-item
                    icon="stars"
                    :label="$t('about.skillsText')"
                  >
                    <q-card style="background: none">
                      <q-card-section>
                        <q-list>
                          <q-item>
                            <q-item-section>
                              <q-item-label>Android(Java)</q-item-label>
                            </q-item-section>
                            <q-item-section side>
                              <q-rating
                                v-model="skillAndroid"
                                size="1em"
                                color="orange"
                                readonly
                              />
                            </q-item-section>
                          </q-item>

                          <q-separator inset />

                          <q-item>
                            <q-item-section>
                              <q-item-label>PHP</q-item-label>
                            </q-item-section>
                            <q-item-section side>
                              <q-rating
                                v-model="skillPhp"
                                size="1em"
                                color="orange"
                                readonly
                              />
                            </q-item-section>
                          </q-item>

                          <q-separator inset />

                          <q-item>
                            <q-item-section>
                              <q-item-label>HTML/CSS</q-item-label>
                            </q-item-section>
                            <q-item-section side>
                              <q-rating
                                v-model="skillHTMLCSS"
                                size="1em"
                                color="orange"
                                readonly
                              />
                            </q-item-section>
                          </q-item>

                          <q-separator inset />

                          <q-item>
                            <q-item-section>
                              <q-item-label>Javascript</q-item-label>
                            </q-item-section>
                            <q-item-section side>
                              <q-rating
                                v-model="skillJavascript"
                                size="1em"
                                color="orange"
                                readonly
                              />
                            </q-item-section>
                          </q-item>

                          <q-separator inset />

                          <q-item>
                            <q-item-section>
                              <q-item-label>Vue.js</q-item-label>
                            </q-item-section>
                            <q-item-section side>
                              <q-rating
                                v-model="skillVue"
                                size="1em"
                                color="orange"
                                readonly
                              />
                            </q-item-section>
                          </q-item>

                          <q-separator inset />

                          <q-item>
                            <q-item-section>
                              <q-item-label>{{
                                $t("about.graphicDesignText")
                              }}</q-item-label>
                            </q-item-section>
                            <q-item-section side>
                              <q-rating
                                v-model="skillGDesign"
                                size="1em"
                                color="orange"
                                readonly
                              />
                            </q-item-section>
                          </q-item>

                          <q-separator inset />
                        </q-list>
                      </q-card-section>
                    </q-card>
                  </q-expansion-item>
                </q-card-section>
              </q-card>
            </q-card-section>
            <q-card-section vertical>
              <q-card-section>
                <div class="text-h3" style="opacity: 0.8">
                  {{ $t("about.biographyText") }}
                </div>
              </q-card-section>
              <q-card-section>
                <div v-html="biographyText" />
              </q-card-section>
            </q-card-section>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { useI18n } from "vue-i18n";
import { useMeta } from "quasar";

import LangSelectorTemplate from "components/LangSelectorTemplate.vue";

export default {
  name: "AboutPage",

  components: {
    LangSelectorTemplate,
  },

  data() {
    return {
      biographyText: this.$t("about.biographyContentText"),
      skillAndroid: 4,
      skillPhp: 3,
      skillHTMLCSS: 4,
      skillJavascript: 5,
      skillVue: 2,
      skillGDesign: 4,
    };
  },

  setup() {
    const { t } = useI18n({ useScope: "global" });

    useMeta(() => {
      return {
        title: t("main.webTitle") + " - " + t("navigation.about"),
      };
    });
  },
};
</script>
