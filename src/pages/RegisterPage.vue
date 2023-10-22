<template>
  <q-page padding>
    <!--
      Template by Joabson Arley
      https://github.com/Joabsonlg/quasar-template
      Edit by Onur Kol
    -->
    <q-card class="q-ma-xl">
      <div class="row">
        <div class="col-0 col-sm-5 bg-primary rounded-left-borders xs-hide">
          <div
            class="row full-width q-px-xl q-pb-xl full-height flex flex-center"
          >
            <div class="">
              <div
                class="text-h4 text-uppercase text-white fredoka"
                style="min-width: 220px"
              >
                Welcome!
              </div>
              <div class="text-white q-my-sm text-subtitle1">
                Enter your details to get started!
              </div>
            </div>
          </div>
        </div>

        <div class="col-12 col-sm-7">
          <div class="row q-ml-sm q-mt-sm sm-and-up-hide">
            <div class="col-12 fredoka text-subtitle1">
              <router-link
                class="text-primary"
                style="text-decoration: none"
                to="/"
              >
                System Name
              </router-link>
            </div>
          </div>
          <div class="row q-pa-sm-sm q-pa-md">
            <div class="col-12">
              <q-card-section>
                <div class="q-mb-xl">
                  <div class="flex justify-center">
                    <div
                      class="text-h4 text-uppercase q-my-none text-weight-bold text-primary fredoka"
                    >
                      Registration Form
                    </div>
                  </div>
                </div>

                <q-form
                  ref="form"
                  class="q-gutter-md"
                  @submit="onSubmit"
                  @reset="onReset"
                >
                  <q-input
                    v-model="user.first_name"
                    label="First Name"
                    name="First Name"
                  />
                  <q-input
                    v-model="user.last_name"
                    label="Last Name"
                    name="Last Name"
                  />
                  <q-input v-model="user.email" label="Email" name="Email" />
                  <q-input
                    v-model="user.password"
                    label="Password"
                    name="password"
                    type="password"
                  />

                  <div>
                    <q-btn
                      class="fredoka"
                      padding="xs xl"
                      color="primary"
                      label="Register"
                      rounded
                      type="submit"
                    />
                    <q-btn
                      label="Reset"
                      color="primary"
                      flat
                      class="q-ml-sm"
                      type="reset"
                    />
                    <div class="q-mt-lg">
                      <div class="q-mt-sm">
                        Already have an account?
                        <router-link class="text-primary" to="/login"
                          >Login</router-link
                        >
                      </div>
                    </div>
                  </div>
                </q-form>
              </q-card-section>
            </div>
          </div>
        </div>
      </div>
    </q-card>
  </q-page>
</template>

<script>
import { ref, reactive } from "vue";
import { useQuasar, useMeta } from "quasar";
import registerService from "src/services/account/firebase-register";

export default {
  name: "RegisterPage",

  setup() {
    const $q = useQuasar();
    useMeta(() => {
      return {
        title: "Onur Kol Web Page - Register",
      };
    });

    const user = reactive({
      last_name: null,
      first_name: null,
      email: null,
      password: null,
    });

    const form = ref(null);

    const onSubmit = async () => {
      if (form.value.validate() && !!(await registerService(user))) {
        //const router = useRouter();
        //router.push('/');
        // For Refresh Navigation
        window.location.href = "/";
      }
    };
    const onReset = () => {
      user.last_name = null;
      user.first_name = null;
      user.email = null;
      user.password = null;
    };

    return {
      user,
      form,
      onSubmit,
      onReset,
    };
  },
};
</script>
